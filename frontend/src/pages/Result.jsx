import { CheckCircle, Award, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();

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

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
              Grade B
            </span>

          </div>

          <div className="bg-gray-50 rounded-xl p-6">

            <p className="text-gray-500 mb-2">
              Recommended Action
            </p>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
              Refurbish
            </span>

          </div>

        </div>

        {/* Metrics */}

        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-white border rounded-xl p-6 text-center">

            <h2 className="text-3xl font-bold text-[#131921]">
              ₹49,500
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
              120
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
              12kg
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
            The product appears functional but shows signs of wear.
            Based on image analysis and condition scoring,
            refurbishment is recommended before resale.
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
            onClick={() => alert("Return Submitted Successfully")}
            className="bg-[#FF9900] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#e88a00]"
          >
            Submit Return Request
          </button>

        </div>

      </div>

    </div>
  );
}