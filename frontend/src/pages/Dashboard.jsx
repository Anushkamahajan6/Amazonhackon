
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Package,
  IndianRupee,
  Leaf,
  Award,
  Clock3
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

export default function Dashboard() {

  const [analytics, setAnalytics] = useState({});
  const [chartData, setChartData] = useState({});
  const [recentReturns, setRecentReturns] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const analyticsRes = await axios.get(
          "http://localhost:5000/api/admin/analytics"
        );

        const chartRes = await axios.get(
          "http://localhost:5000/api/admin/analytics/charts"
        );

        const returnsRes = await axios.get(
          "http://localhost:5000/api/returns"
        );

        setAnalytics(analyticsRes.data);
        setChartData(chartRes.data);

        setRecentReturns(
          returnsRes.data.slice(-3).reverse()
        );

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchData();

  }, []);

  const stats = [
    {
      title: "Returns Processed",
      value: analytics.totalReturns || 0,
      icon: <Package size={24} />,
    },

    {
      title: "Revenue Recovered",
      value: `₹${chartData.recoveredRevenue || 0}`,
      icon: <IndianRupee size={24} />,
    },

    {
      title: "Green Credits Issued",
      value: analytics.totalCreditsIssued || 0,
      icon: <Award size={24} />,
    },

    {
      title: "Pending Reviews",
      value: 47,
      icon: <Clock3 size={24} />,
    },

    {
      title: "CO₂ Saved",
      value: `${chartData.totalCO2Saved || 0} kg`,
      icon: <Leaf size={24} />,
    },
  ];

  const data = [
    {
      name: "Resell",
      value: chartData.dispositionStats?.Resell || 0
    },

    {
      name: "Refurbish",
      value: chartData.dispositionStats?.Refurbish || 0
    },

    {
      name: "Recycle",
      value: chartData.dispositionStats?.Recycle || 0
    }
  ];

  return (
    <div className="p-6 bg-[#F2F3F3] min-h-screen">

      <h1 className="text-3xl font-bold text-[#131A22] mb-2">
        Operations Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Monitor return disposition, resale performance, trust scores and sustainability impact.
      </p>

      {/* KPI Cards */}

      <div className="grid grid-cols-5 gap-4">

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

          <PieChart width={650} height={280}>

            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >

              {data.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={
                    ["#0088FE", "#00C49F", "#FFBB28"][index % 3]
                  }
                />

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

            {recentReturns.map((item) => (

              <div key={item._id}>

                <p className="font-medium">
                  {item.itemId?.name || "Product"}
                </p>

                <p className="text-sm text-green-600">

                  Grade {item.conditionGrade}

                  {" • "}

                  {item.disposition}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Trust Scores */}

        <div className="bg-white rounded-xl p-6 shadow-sm">

          <h2 className="text-lg font-semibold mb-4">
            Top Seller Trust Scores
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>TechStore</span>

              <span className="font-bold text-green-600">
                ★★★★★ 92/100
              </span>

            </div>

            <div className="flex justify-between">

              <span>MobileHub</span>

              <span className="font-bold text-yellow-500">
                ★★★★☆ 84/100
              </span>

            </div>

            <div className="flex justify-between">

              <span>GadgetZone</span>

              <span className="font-bold text-orange-500">
                ★★★★☆ 78/100
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

