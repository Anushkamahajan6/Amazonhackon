import { useState, useEffect } from "react";
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const STATUS_CONFIG = {
  Verified: { label: "Verified",  cls: "bg-green-100 text-green-700",  icon: <CheckCircle size={12} className="inline mr-1" /> },
  Trusted:  { label: "Trusted",   cls: "bg-yellow-100 text-yellow-700", icon: <TrendingUp  size={12} className="inline mr-1" /> },
  Monitor:  { label: "Monitor",   cls: "bg-red-100 text-red-700",      icon: <AlertTriangle size={12} className="inline mr-1" /> },
};

const scoreColor = (score) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-500";
  return "text-red-500";
};

const scoreBarColor = (score) => {
  if (score >= 85) return "bg-green-500";
  if (score >= 70) return "bg-yellow-400";
  return "bg-red-400";
};

// Derive status from trustScore (same thresholds as Dashboard)
const getStatus = (score) => {
  if (score >= 85) return "Verified";
  if (score >= 70) return "Trusted";
  return "Monitor";
};

// AI Accuracy = credits-based proxy (higher credits → better accuracy)
const getAccuracy = (greenCredits, returnCount) => {
  if (returnCount === 0) return 0;
  const base = Math.min(95, 60 + Math.floor(greenCredits / returnCount / 10) * 5);
  return base;
};

export default function Trust() {
  const [sellers, setSellers] = useState([]);
  const [kpis,    setKpis]    = useState({ avgScore: 0, highRisk: 0, verified: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrust = async () => {
      try {
        // Use the dedicated trust-scores endpoint — real DB data
        const res = await axios.get(`${API_BASE}/api/admin/analytics/trust-scores`);
        const data = res.data;

        const enriched = data.map((s) => ({
          id:          s.sellerId,
          name:        s.sellerName,
          score:       s.trustScore,
          greenCredits: s.greenCredits,
          returnCount:  s.returnCount,
          accuracy:    getAccuracy(s.greenCredits, s.returnCount),
          // disputes = returns that needed Refurbish/Recycle (non-perfect)
          disputes:    Math.max(0, s.returnCount - Math.round(s.returnCount * (s.trustScore / 100))),
          status:      getStatus(s.trustScore),
        }));

        setSellers(enriched);

        const avgScore = enriched.length > 0
          ? Math.round(enriched.reduce((sum, s) => sum + s.score, 0) / enriched.length)
          : 0;
        const highRisk = enriched.filter((s) => s.status === "Monitor").length;
        const verified = enriched.filter((s) => s.status === "Verified").length;

        setKpis({ avgScore, highRisk, verified });
      } catch (error) {
        console.error("Error fetching trust data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrust();
  }, []);

  return (
    <div className="p-6 bg-[#F2F3F3] min-h-screen">

      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <ShieldCheck size={28} className="text-[#FF9900]" />
        <h1 className="text-3xl font-bold text-[#131A22]">Trust System</h1>
      </div>
      <p className="text-gray-500 text-sm mb-8">
        Seller trust scores computed from green credits and successful returns — no hardcoded values.
      </p>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#FF9900]">
          <p className="text-gray-500 text-sm">Average Trust Score</p>
          <h2 className="text-4xl font-bold mt-2 text-[#131A22]">
            {loading ? "..." : kpis.avgScore}
          </h2>
          <p className="text-xs text-gray-400 mt-1">out of 100</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-400">
          <p className="text-gray-500 text-sm">High Risk Sellers</p>
          <h2 className="text-4xl font-bold mt-2 text-red-500">
            {loading ? "..." : kpis.highRisk}
          </h2>
          <p className="text-xs text-gray-400 mt-1">need attention</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-400">
          <p className="text-gray-500 text-sm">Verified Sellers</p>
          <h2 className="text-4xl font-bold mt-2 text-green-600">
            {loading ? "..." : kpis.verified}
          </h2>
          <p className="text-xs text-gray-400 mt-1">score ≥ 85</p>
        </div>

      </div>

      {/* Seller Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-[#131A22]">All Sellers</h2>
          <p className="text-xs text-gray-400">Data from /api/admin/analytics/trust-scores</p>
        </div>

        <table className="w-full">
          <thead className="bg-[#232F3E] text-white text-sm">
            <tr>
              <th className="p-4 text-left">Seller</th>
              <th className="p-4 text-left">Trust Score</th>
              <th className="p-4 text-left">Score Bar</th>
              <th className="p-4 text-left">Green Credits</th>
              <th className="p-4 text-left">Returns</th>
              <th className="p-4 text-left">AI Accuracy</th>
              <th className="p-4 text-left">Disputes</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b">
                  {Array.from({ length: 8 }).map((__, j) => (
                    <td key={j} className="p-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse w-20" />
                    </td>
                  ))}
                </tr>
              ))
            ) : sellers.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-400">
                  No seller data available.
                </td>
              </tr>
            ) : (
              sellers.map((seller) => {
                const cfg = STATUS_CONFIG[seller.status] || STATUS_CONFIG.Monitor;
                return (
                  <tr key={seller.id} className="border-b hover:bg-gray-50 transition">

                    <td className="p-4 font-semibold text-[#131A22]">
                      {seller.name}
                    </td>

                    <td className="p-4">
                      <span className={`font-bold text-lg ${scoreColor(seller.score)}`}>
                        {seller.score}
                      </span>
                      <span className="text-gray-400 text-xs">/100</span>
                    </td>

                    <td className="p-4">
                      <div className="w-28 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${scoreBarColor(seller.score)}`}
                          style={{ width: `${seller.score}%` }}
                        />
                      </div>
                    </td>

                    <td className="p-4 text-[#FF9900] font-medium">
                      {seller.greenCredits.toLocaleString()}
                    </td>

                    <td className="p-4 text-gray-700">
                      {seller.returnCount}
                    </td>

                    <td className="p-4 text-gray-700">
                      {seller.accuracy}%
                    </td>

                    <td className="p-4 text-gray-700">
                      {seller.disputes}
                    </td>

                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${cfg.cls}`}>
                        {cfg.icon}{cfg.label}
                      </span>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}