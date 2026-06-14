   import { useEffect } from "react";
import {
  useNavigate,
  useLocation
} from "react-router-dom";

export default function Analyzing() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/result", {
  state: location.state
});
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate, location]);

  return (
    <div className="min-h-screen bg-[#F2F3F3] flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[700px]">

        <h1 className="text-4xl font-bold text-center text-[#131921] mb-4">
          AI Analysis in Progress
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Please wait while our AI evaluates your return request.
        </p>

        {/* Spinner */}

        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 border-4 border-[#FF9900] border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Steps */}

        <div className="space-y-6">

          <div className="flex items-center gap-4">
            <span className="text-green-600 text-2xl">✓</span>
            <p className="font-medium">
              Image Validation Completed
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-green-600 text-2xl">✓</span>
            <p className="font-medium">
              Damage Detection Completed
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-green-600 text-2xl">✓</span>
            <p className="font-medium">
              Condition Assessment Completed
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-yellow-500 text-2xl">
              ⏳
            </span>

            <p className="font-medium">
              Calculating Best Disposition...
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}