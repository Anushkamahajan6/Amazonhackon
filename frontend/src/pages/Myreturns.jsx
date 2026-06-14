import {
  Clock,
  CheckCircle,
  Wrench,
  Award,
  PackageCheck
} from "lucide-react";

import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const STATUS_BADGE = {
  Pending: (
    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
      <Clock size={13} />
      Pending
    </span>
  ),

  Approved: (
    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
      <CheckCircle size={13} />
      Approved
    </span>
  ),

  Completed: (
    <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
      <Wrench size={13} />
      Completed
    </span>
  )
};

const GRADE_COLOR = {
  A: "text-green-600",
  B: "text-yellow-600",
  C: "text-orange-600",
  D: "text-red-600"
};

export default function MyReturns() {

  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchReturns = async () => {

      try {

        const response = await axios.get(
          `${API_BASE}/api/returns`
        );

        setReturns(response.data);
        console.log(response.data);
      }
      catch (error) {

        console.log(error);

      }
      finally {

        setLoading(false);

      }

    };

    fetchReturns();

  }, []);

  return (

    <div className="min-h-screen bg-[#F2F3F3] p-8">

      {/* Header */}

      <div className="flex items-center gap-3 mb-2">

        <PackageCheck
          size={30}
          className="text-[#FF9900]"
        />

        <h1 className="text-4xl font-bold text-[#131921]">
          My Returns
        </h1>

      </div>

      <p className="text-gray-500 mb-8">
        Track your return requests and earned green credits.
      </p>

      {/* Loading */}

      {loading && (

        <div className="text-center text-gray-500">
          Loading returns...
        </div>

      )}

      {/* Empty */}

      {!loading && returns.length === 0 && (

        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

          <PackageCheck
            size={50}
            className="mx-auto text-gray-300 mb-4"
          />

          <p className="text-gray-500">
            No returns found.
          </p>

        </div>

      )}

      {/* Cards */}

      <div className="space-y-6">

        {returns.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
          >

            {/* Top */}

            <div className="flex justify-between mb-5">

              <div className="flex gap-5">

                {/* Image */}

                <img
                  src={item.image}
                  alt=""
                  className="w-24 h-24 rounded-xl object-cover border"
                />

                <div>

                  <h2 className="text-xl font-bold text-[#131921]">

                    {item.itemId?.name}

                  </h2>

                  <p className="text-gray-400 text-sm mt-1">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString("en-IN")}

                  </p>

                  <p className="text-gray-500 mt-2">

                    Reason: {item.reason}

                  </p>

                </div>

              </div>

              {STATUS_BADGE[item.status || "Pending"]}

            </div>

            {/* Bottom */}

            <div className="grid grid-cols-4 gap-4">

              {/* Grade */}

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-xs uppercase text-gray-500 mb-2">

                  Grade

                </p>

                <h2
                  className={`font-bold text-lg ${GRADE_COLOR[item.conditionGrade]}`}
                >
                  Grade {item.conditionGrade}
                </h2>

              </div>

              {/* Action */}

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-xs uppercase text-gray-500 mb-2">

                  Disposition

                </p>

                <h2 className="font-bold">

                  {item.disposition}

                </h2>

              </div>

              {/* Credits */}

              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 mb-2">

                  <Award
                    size={16}
                    className="text-[#FF9900]"
                  />

                  <span className="text-xs uppercase text-gray-500">

                    Credits

                  </span>

                </div>

                <h2 className="font-bold text-[#FF9900]">

                  {item.creditsEarned}

                </h2>

              </div>

              {/* CO2 */}

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-xs uppercase text-gray-500 mb-2">

                  CO₂ Saved

                </p>

                <h2 className="font-bold text-green-600">

                  {item.co2Saved} kg

                </h2>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}