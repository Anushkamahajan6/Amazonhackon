import { Package, IndianRupee, Leaf, Award, Clock3, ShieldCheck } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const GRADE_COLOR = {
  A: "text-green-600",
  B: "text-yellow-600",
  C: "text-red-500",
};

const DECISION_COLOR = {
  Resell:    "bg-green-100 text-green-700",
  Refurbish: "bg-yellow-100 text-yellow-700",
  Recycle:   "bg-blue-100 text-blue-700",
};

const TRUST_COLOR = (score) => {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-yellow-500";
  return "text-red-500";
};

export default function Dashboard() {
  const [stats,         setStats]         = useState([]);
  const [pieData,       setPieData]       = useState([]);
  const [recentReturns, setRecentReturns] = useState([]);
  const [trustScores,   setTrustScores]   = useState([]);
  const [loading,       setLoading]       = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [analyticsRes, chartsRes, recentRes, trustRes] = await Promise.all([
          axios.get(`${API_BASE}/api/admin/analytics`),
          axios.get(`${API_BASE}/api/admin/analytics/charts`),
          axios.get(`${API_BASE}/api/admin/analytics/recent-returns`),
          axios.get(`${API_BASE}/api/admin/analytics/trust-scores`),
        ]);

        const a = analyticsRes.data;
        const c = chartsRes.data;

        // ── KPI Cards — every value straight from backend ──────────────────
        setStats([
          {
            title: "Returns Processed",
            value: (a.totalReturns || 0).toLocaleString(),
            icon:  <Package size={24} />,
          },
          {
            title: "Revenue Recovered",
            value: `₹${(a.revenueRecovered || 0).toLocaleString("en-IN")}`,
            icon:  <IndianRupee size={24} />,
          },
          {
            title: "Green Credits Issued",
            value: (a.totalCreditsIssued || 0).toLocaleString(),
            icon:  <Award size={24} />,
          },
          {
            title: "Pending Reviews",
            value: (a.pendingReviews || 0).toLocaleString(),
            icon:  <Clock3 size={24} />,
          },
          {
            title: "CO₂ Saved",
            value: `${(a.totalCO2Saved || 0).toLocaleString()} kg`,
            icon:  <Leaf size={24} />,
          },
        ]);

        // ── Pie chart — real disposition breakdown ──────────────────────────
        const d = c.dispositionStats || {};
        const raw = [
          { name: "Resell",    value: d.Resell    || 0 },
          { name: "Refurbish", value: d.Refurbish || 0 },
          { name: "Recycle",   value: d.Recycle   || 0 },
        ].filter(item => item.value > 0);

        setPieData(raw.length > 0 ? raw : [{ name: "No Returns Yet", value: 1 }]);

        // ── Recent Returns — real data from backend ─────────────────────────
        setRecentReturns(recentRes.data || []);

        // ── Trust Scores — real data from backend ───────────────────────────
        setTrustScores(trustRes.data || []);

      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="p-6 bg-[#F2F3F3] min-h-screen">

      {/* Page Header */}
      <h1 className="text-3xl font-bold text-[#131A22] mb-1">Operations Dashboard</h1>
      <p className="text-gray-500 mb-8 text-sm">
        All metrics are live from the backend — no hardcoded values.
      </p>

      {/* ── KPI Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse h-24" />
            ))
          : stats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <h2 className="text-2xl font-bold text-[#131A22] mt-2">
                      {stat.value}
                    </h2>
                  </div>
                  <div className="text-[#FF9900] mt-1">{stat.icon}</div>
                </div>
              </div>
            ))}
      </div>

      {/* ── Row 1: Disposition Breakdown (wide) | Recent Returns ──────────── */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        {/* Pie Chart — col-span-2 */}
        <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Disposition Breakdown</h2>
          <p className="text-xs text-gray-400 mb-4">
            How returned items are classified by AI
          </p>
          <PieChart width={580} height={260}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              labelLine={true}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Recent Returns */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-1">Recent Returns</h2>
          <p className="text-xs text-gray-400 mb-4">Latest 5 from database</p>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : recentReturns.length === 0 ? (
            <p className="text-gray-400 text-sm">No returns recorded yet.</p>
          ) : (
            <div className="space-y-4">
              {recentReturns.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm text-[#131A22]">{item.product}</p>
                    <p className={`text-xs mt-0.5 ${GRADE_COLOR[item.grade] || "text-gray-500"}`}>
                      Grade {item.grade} • {item.decision}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${DECISION_COLOR[item.decision] || "bg-gray-100 text-gray-600"}`}>
                      {item.credits} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Row 2: Trust Scores | Sustainability Impact ───────────────────── */}
      <div className="grid grid-cols-2 gap-6">

        {/* Trust Scores */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={18} className="text-[#FF9900]" />
            <h2 className="text-lg font-semibold">Top Seller Trust Scores</h2>
          </div>
          <p className="text-xs text-gray-400 mb-5">
            Based on green credits + successful returns
          </p>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : trustScores.length === 0 ? (
            <p className="text-gray-400 text-sm">No seller data available.</p>
          ) : (
            <div className="space-y-3">
              {trustScores.map((seller) => (
                <div key={seller.sellerId} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{seller.sellerName}</p>
                    <p className="text-xs text-gray-400">
                      {seller.greenCredits} credits · {seller.returnCount} returns
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-[#FF9900]"
                        style={{ width: `${seller.trustScore}%` }}
                      />
                    </div>
                    <span className={`font-bold text-sm ${TRUST_COLOR(seller.trustScore)}`}>
                      {seller.trustScore}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sustainability Impact */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Leaf size={18} className="text-green-500" />
            <h2 className="text-lg font-semibold">Sustainability Impact</h2>
          </div>
          <p className="text-xs text-gray-400 mb-5">
            Cumulative environmental benefit of all returns
          </p>

          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <Leaf size={24} className="mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold text-green-700">
                  {stats.find(s => s.title === "CO₂ Saved")?.value || "0 kg"}
                </p>
                <p className="text-xs text-gray-500 mt-1">CO₂ Saved</p>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <Award size={24} className="mx-auto text-amber-500 mb-2" />
                <p className="text-2xl font-bold text-amber-700">
                  {stats.find(s => s.title === "Green Credits Issued")?.value || "0"}
                </p>
                <p className="text-xs text-gray-500 mt-1">Credits Issued</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <Package size={24} className="mx-auto text-blue-500 mb-2" />
                <p className="text-2xl font-bold text-blue-700">
                  {stats.find(s => s.title === "Returns Processed")?.value || "0"}
                </p>
                <p className="text-xs text-gray-500 mt-1">Items Returned</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <IndianRupee size={24} className="mx-auto text-purple-500 mb-2" />
                <p className="text-2xl font-bold text-purple-700">
                  {stats.find(s => s.title === "Revenue Recovered")?.value || "₹0"}
                </p>
                <p className="text-xs text-gray-500 mt-1">Revenue Recovered</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
