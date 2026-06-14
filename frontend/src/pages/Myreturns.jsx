import { Clock, Wrench, Award } from "lucide-react";

export default function MyReturns() {
  const returns = [
    {
      id: 1,
      product: "iPhone 13",
      reason: "Screen Flickering",
      grade: "B",
      disposition: "Refurbish",
      co2Saved: "12kg",
      status: "Under Review",
      date: "Today",
      credits: 120,
    },
    {
      id: 2,
      product: "Boat Headphones",
      reason: "Audio Issue",
      grade: "A",
      disposition: "Resell",
      co2Saved: "8kg",
      status: "Approved",
      date: "10 Jun 2026",
      credits: 80,
    },
    {
      id: 3,
      product: "Dell Laptop",
      reason: "Battery Problem",
      grade: "B",
      disposition: "Refurbish",
      co2Saved: "20kg",
      status: "Refurbishing",
      date: "5 Jun 2026",
      credits: 150,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Approved
          </span>
        );

      case "Under Review":
        return (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            Under Review
          </span>
        );

      case "Refurbishing":
        return (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            Refurbishing
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F3F3] p-8">

      <h1 className="text-4xl font-bold text-[#131921] mb-2">
        My Returns
      </h1>

      <p className="text-gray-600 mb-8">
        Track all your return requests and rewards.
      </p>

      <div className="space-y-6">

        {returns.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm p-6"
          >

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-xl font-bold">
                  {item.product}
                </h2>

                <p className="text-gray-500 mt-1">
                  Submitted: {item.date}
                </p>

                <p className="text-gray-500">
                  Reason: {item.reason}
                </p>

                <p className="text-gray-500">
                  Disposition: {item.disposition}
                </p>

              </div>

              {getStatusBadge(item.status)}

            </div>

            <div className="mt-6 grid grid-cols-5 gap-4">

              {/* Status */}
              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 mb-2">
                  <Clock size={18} />
                  <span className="font-medium">
                    Status
                  </span>
                </div>

                <p>{item.status}</p>

              </div>

              {/* Credits */}
              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 mb-2">
                  <Award size={18} />
                  <span className="font-medium">
                    Credits
                  </span>
                </div>

                <p>{item.credits}</p>

              </div>

              {/* Grade */}
              <div className="bg-gray-50 rounded-xl p-4">

                <span className="font-medium">
                  Grade
                </span>

                <p className="mt-2">
                  {item.grade}
                </p>

              </div>

              {/* CO₂ Saved */}
              <div className="bg-gray-50 rounded-xl p-4">

                <span className="font-medium">
                  CO₂ Saved
                </span>

                <p className="mt-2">
                  {item.co2Saved}
                </p>

              </div>

              {/* Next Step */}
              <div className="bg-gray-50 rounded-xl p-4">

                <div className="flex items-center gap-2 mb-2">
                  <Wrench size={18} />
                  <span className="font-medium">
                    Next Step
                  </span>
                </div>

                <p>
                  {item.status === "Approved"
                    ? "Refund Processing"
                    : item.status === "Refurbishing"
                    ? "Repair In Progress"
                    : "Awaiting Review"}
                </p>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}