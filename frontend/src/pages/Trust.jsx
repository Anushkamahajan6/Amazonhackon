export default function Trust() {
  const sellers = [
    {
      id: 1,
      name: "TechStore",
      score: 92,
      accuracy: 95,
      disputes: 1,
      status: "Verified",
    },
    {
      id: 2,
      name: "MobileHub",
      score: 84,
      accuracy: 89,
      disputes: 3,
      status: "Trusted",
    },
    {
      id: 3,
      name: "GadgetZone",
      score: 78,
      accuracy: 82,
      disputes: 5,
      status: "Monitor",
    },
  ];

  return (
    <div className="p-6 bg-[#F2F3F3] min-h-screen">

      <h1 className="text-3xl font-bold text-[#131A22]">
        Trust System
      </h1>

      <p className="text-gray-600 mb-8">
        Monitor seller reliability and AI trust metrics.
      </p>

      {/* KPI Cards */}

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Average Trust Score
          </p>

          <h2 className="text-3xl font-bold mt-2">
            84
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            High Risk Sellers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            12
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">
            Verified Sellers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            248
          </h2>
        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-[#232F3E] text-white">

            <tr>
              <th className="p-4 text-left">
                Seller
              </th>

              <th className="p-4 text-left">
                Trust Score
              </th>

              <th className="p-4 text-left">
                AI Accuracy
              </th>

              <th className="p-4 text-left">
                Disputes
              </th>

              <th className="p-4 text-left">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            {sellers.map((seller) => (
              <tr
                key={seller.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-medium">
                  {seller.name}
                </td>

                <td className="p-4">
                  {seller.score}
                </td>

                <td className="p-4">
                  {seller.accuracy}%
                </td>

                <td className="p-4">
                  {seller.disputes}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      seller.status === "Verified"
                        ? "bg-green-100 text-green-700"
                        : seller.status === "Trusted"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {seller.status}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}