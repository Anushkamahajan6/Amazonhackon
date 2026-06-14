import { Clock, CheckCircle, Wrench, Award, PackageCheck } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

// Map AI decision → customer-facing status
const DECISION_TO_STATUS = {
  Resell:    "Approved",
  Refurbish: "Refurbishing",
  Recycle:   "Under Review",
};

// Map status → next step message
const NEXT_STEP = {
  Approved:     "Refund Processing",
  Refurbishing: "Repair In Progress",
  "Under Review": "Awaiting Review",
};

const STATUS_BADGE = {
  Approved: (
    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
      <CheckCircle size={13} /> Approved
    </span>
  ),
  Refurbishing: (
    <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
      <Wrench size={13} /> Refurbishing
    </span>
  ),
  "Under Review": (
    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
      <Clock size={13} /> Under Review
    </span>
  ),
};

const GRADE_COLOR = { A: "text-green-600", B: "text-yellow-600", C: "text-red-500" };

export default function MyReturns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        // Use the same real-returns endpoint used by the Returns Review Queue
        const res = await axios.get(`${API_BASE}/api/admin/analytics/recent-returns`);

        const mapped = res.data.map((ret, idx) => ({
          id:        idx,
          product:   ret.product,                                // real item name
          grade:     ret.grade,                                  // real conditionGrade
          decision:  ret.decision,                               // real disposition
          status:    DECISION_TO_STATUS[ret.decision] || "Under Review",
          credits:   ret.credits,                                // real credits from backend
          date: new Date(ret.createdAt).toLocaleDateString("en-IN", {
            day: "numeric", month: "short", year: "numeric",
          }),
        }));

        setReturns(mapped);
      } catch (error) {
        console.error("Error fetching returns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F3F3] p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <PackageCheck size={28} className="text-[#FF9900]" />
        <h1 className="text-4xl font-bold text-[#131921]">My Returns</h1>
      </div>
      <p className="text-gray-500 text-sm mb-8">
        Track all your return requests and green credit rewards.
      </p>

      {/* Summary strip */}
      {!loading && returns.length > 0 && (
        <div className="flex gap-4 mb-8">
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm flex items-center gap-2">
            <span className="text-sm text-gray-500">Total Returns</span>
            <span className="font-bold text-[#131921]">{returns.length}</span>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm flex items-center gap-2">
            <Award size={16} className="text-[#FF9900]" />
            <span className="text-sm text-gray-500">Total Credits</span>
            <span className="font-bold text-[#FF9900]">
              {returns.reduce((sum, r) => sum + r.credits, 0)}
            </span>
          </div>
          <div className="bg-white rounded-xl px-5 py-3 shadow-sm flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-sm text-gray-500">Approved</span>
            <span className="font-bold text-green-600">
              {returns.filter(r => r.status === "Approved").length}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse h-36" />
          ))
        ) : returns.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <PackageCheck size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No returns found.</p>
          </div>
        ) : (
          returns.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
            >
              {/* Top row — product name + status */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="text-xl font-bold text-[#131921]">{item.product}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    Submitted: {item.date}
                  </p>
                </div>
                {STATUS_BADGE[item.status]}
              </div>

              {/* Detail tiles */}
              <div className="grid grid-cols-4 gap-3">

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 text-gray-500">
                    <Clock size={15} />
                    <span className="text-xs font-semibold uppercase tracking-wide">Status</span>
                  </div>
                  <p className="text-sm font-medium">{item.status}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 text-gray-500">
                    <span className="text-xs font-semibold uppercase tracking-wide">AI Grade</span>
                  </div>
                  <p className={`text-sm font-bold ${GRADE_COLOR[item.grade] || "text-gray-700"}`}>
                    Grade {item.grade} - {item.decision}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 text-gray-500">
                    <Award size={15} />
                    <span className="text-xs font-semibold uppercase tracking-wide">Credits</span>
                  </div>
                  <p className="text-sm font-bold text-[#FF9900]">{item.credits} pts</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2 text-gray-500">
                    <Wrench size={15} />
                    <span className="text-xs font-semibold uppercase tracking-wide">Next Step</span>
                  </div>
                  <p className="text-sm font-medium">{NEXT_STEP[item.status]}</p>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}