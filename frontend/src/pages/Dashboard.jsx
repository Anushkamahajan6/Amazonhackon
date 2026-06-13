import { Package, IndianRupee, Leaf, Award } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


export default function Dashboard() {
  const stats = [
    {
      title: "Returns Processed",
      value: "1,248",
      icon: <Package size={24} />,
    },
    {
      title: "Revenue Recovered",
      value: "₹4.2L",
      icon: <IndianRupee size={24} />,
    },
    {
      title: "Green Credits Issued",
      value: "8,450",
      icon: <Award size={24} />,
    },
    {
      title: "CO₂ Saved",
      value: "320 kg",
      icon: <Leaf size={24} />,
    },
  ];
  const data = [
  { name: "Resell", value: 45 },
  { name: "Refurbish", value: 30 },
  { name: "Donate", value: 15 },
  { name: "Recycle", value: 10 },
];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-[#131A22] mb-2">
        Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Monitor returns, sustainability impact and trust metrics.
      </p>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">
                  {stat.title}
                </p>

                <h2 className="text-2xl font-bold text-[#131A22] mt-2">
                  {stat.value}
                </h2>
              </div>

              <div className="text-[#FF9900]">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6 mt-8">

  {/* Pie Chart */}
  <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">
      Disposition Breakdown
    </h2>

    <PieChart width={400} height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={true}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>

  {/* Recent Returns */}
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h2 className="text-lg font-semibold mb-4">
      Recent Returns
    </h2>

    <div className="space-y-4">
      <div>
        <p className="font-medium">iPhone 13</p>
        <p className="text-sm text-green-600">
          Grade A • Resell
        </p>
      </div>

      <div>
        <p className="font-medium">Laptop</p>
        <p className="text-sm text-yellow-600">
          Grade B • Refurbish
        </p>
      </div>

      <div>
        <p className="font-medium">Headphones</p>
        <p className="text-sm text-blue-600">
          Grade A • Resell
        </p>
      </div>
    </div>
  </div>

</div>
    </div>
  );
}