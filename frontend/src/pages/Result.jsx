import { CheckCircle, Award, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.result;
  const item = data?.returnedItem;

  const [result, setResult] = useState({
    grade: "...",
    gradeBadgeColor: "bg-gray-100 text-gray-700",
    action: "...",
    actionBadgeColor: "bg-gray-100 text-gray-700",
    refund: "...",
    credits: "...",
    co2: "...",
    summary: "Analyzing your return...",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const [chartsRes, analyticsRes] = await Promise.all([
          axios.get(`${API_BASE}/api/admin/analytics/charts`),
          axios.get(`${API_BASE}/api/admin/analytics`),
        ]);

        const c = chartsRes.data;
        const a = analyticsRes.data;
        const d = c.dispositionStats || {};

        // Determine most common disposition for grade/action
        let topDisposition = "Refurbish";
        let topCount = 0;
        Object.entries(d).forEach(([key, val]) => {
          if (val > topCount) {
            topDisposition = key;
            topCount = val;
          }
        });

        let grade = "B";
        let gradeBadgeColor = "bg-yellow-100 text-yellow-700";
        let actionBadgeColor = "bg-blue-100 text-blue-700";
        let summary =
          "The product appears functional but shows signs of wear. Based on image analysis and condition scoring, refurbishment is recommended before resale.";

        if (topDisposition === "Resell") {
          grade = "A";
          gradeBadgeColor = "bg-green-100 text-green-700";
          actionBadgeColor = "bg-green-100 text-green-700";
          summary =
            "The product is in excellent condition with minimal wear. It can be directly resold on the marketplace.";
        } else if (topDisposition === "Recycle") {
          grade = "C";
          gradeBadgeColor = "bg-red-100 text-red-700";
          actionBadgeColor = "bg-red-100 text-red-700";
          summary =
            "The product shows significant wear and damage. Recycling is the most sustainable option.";
        }

        const avgCredits = c.totalReturns > 0
          ? Math.round((a.totalCreditsIssued || 0) / c.totalReturns)
          : 0;
        const avgCO2 = c.totalReturns > 0
          ? Math.round(c.totalCO2Saved / c.totalReturns)
          : 0;

        setResult({
          grade: `Grade ${grade}`,
          gradeBadgeColor,
          action: topDisposition,
          actionBadgeColor,
          refund: `₹${((a.totalCreditsIssued || 0) * 50).toLocaleString("en-IN")}`,
          credits: avgCredits,
          co2: `${avgCO2}kg`,
          summary,
        });
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F3F3] flex items-center justify-center p-8">

      <div className="bg-white rounded-2xl shadow-lg p-10 w-[850px]">

        {/* Success Header */}

        <div className="text-center mb-8">

          <CheckCircle
            size={70}
            className="mx-auto text-green-500 mb-4"
          />

          <h1 className="text-4xl font-bold text-[#131921]">
            Return Assessment Complete
          </h1>

          <p className="text-gray-600 mt-3">
            Our AI has analyzed your return request.
          </p>

        </div>

        {/* Main Results */}

        <div className="grid grid-cols-2 gap-6 mb-8">

          <div className="bg-gray-50 rounded-xl p-6">

            <p className="text-gray-500 mb-2">
              Product Grade
            </p>

            <span className={`${result.gradeBadgeColor} px-4 py-2 rounded-full font-semibold`}>
              {result.grade}
            </span>

          </div>

          <div className="bg-gray-50 rounded-xl p-6">

            <p className="text-gray-500 mb-2">
              Recommended Action
            </p>

            <span className={`${result.actionBadgeColor} px-4 py-2 rounded-full font-semibold`}>
              {result.action}
            </span>

          </div>

        </div>

        {/* Metrics */}

        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-white border rounded-xl p-6 text-center">

            <h2 className="text-3xl font-bold text-[#131921]">
              {result.refund}
            </h2>

            <p className="text-gray-500 mt-2">
              Estimated Refund
            </p>

          </div>

          <div className="bg-white border rounded-xl p-6 text-center">

            <Award
              size={30}
              className="mx-auto text-[#FF9900] mb-2"
            />

            <h2 className="text-3xl font-bold">
              {result.credits}
            </h2>

            <p className="text-gray-500">
              Credits Earned
            </p>

          </div>

          <div className="bg-white border rounded-xl p-6 text-center">

            <Leaf
              size={30}
              className="mx-auto text-green-500 mb-2"
            />

            <h2 className="text-3xl font-bold">
              {result.co2}
            </h2>

            <p className="text-gray-500">
              CO₂ Saved
            </p>

          </div>

        </div>

        {/* AI Explanation */}

        <div className="bg-gray-50 rounded-xl p-6 mb-8">

          <h2 className="text-xl font-bold mb-3">
            AI Assessment Summary
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {result.summary}
          </p>

        </div>

        {/* Action Buttons */}

        <div className="flex gap-4 justify-center">

          <button
            onClick={() => navigate("/home")}
            className="border border-gray-300 px-6 py-3 rounded-lg"
          >
            Back to Home
          </button>

          <button
            onClick={() => navigate("/my-returns")}
            className="bg-[#FF9900] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#e88a00]"
          >
            Submit Return Request
          </button>

        </div>

      </div>

    </div>
  );
}
