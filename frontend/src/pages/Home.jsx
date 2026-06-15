import { Package, Award, Leaf, Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

const EMOJI_MAP = {
  Electronics: "📱",
  Fashion: "👟",
  Furniture: "🪑",
};

export default function Home() {
  const navigate = useNavigate();

  const [recentOrders, setRecentOrders] = useState([]);
  const [sustainability, setSustainability] = useState({
    totalReturns: 0,
    totalCredits: 0,
    totalCO2: 0,
  });
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, chartsRes, analyticsRes] = await Promise.all([
          axios.get(`${API_BASE}/api/marketplace`),
          axios.get(`${API_BASE}/api/admin/analytics/charts`),
          axios.get(`${API_BASE}/api/admin/analytics`),
        ]);

        const items = itemsRes.data.slice(0, 2).map((item, index) => ({
          id: item._id,
          name: item.name,
          orderId: item._id.slice(-9).toUpperCase(),
          delivered: new Date(item.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          price: `₹${item.originalPrice.toLocaleString("en-IN")}`,
          image: EMOJI_MAP[item.category] || "📦",
        }));

        setRecentOrders(items);

        setSustainability({
          totalReturns: chartsRes.data.totalReturns || 0,
          totalCredits: analyticsRes.data.totalCreditsIssued || 0,
          totalCO2: chartsRes.data.totalCO2Saved || 0,
        });
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F3F3]">
      {/* Top Header */}
      <div className="bg-[#131921] px-8 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[#FF9900] text-3xl font-bold">Amazon</h1>

            <p className="text-white text-sm">Second Life Commerce</p>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="text-white" />

            <div className="bg-[#FF9900] text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
              {userName.slice(0, 2).toUpperCase()}
            </div>

            <span className="text-white font-medium">{userName}</span>
          </div>
        </div>

        {/* Search Bar */}

        <div className="mt-6 bg-white rounded-full p-3 flex items-center">
          <Search className="text-gray-400 ml-2" />

          <input
            type="text"
            placeholder="Search returns, orders, or products..."
            className="w-full ml-3 outline-none"
          />
        </div>
      </div>

      {/* Hero Section */}

      <div className="px-8 mt-8">
        <div className="bg-gradient-to-r from-[#131921] to-[#1F3A56] rounded-2xl p-10 text-white shadow-lg">
          <h1 className="text-5xl font-bold mb-4">Welcome Back, {userName} 👋</h1>

          <p className="text-xl text-slate-200 mb-8 max-w-2xl">
            Manage returns and contribute to a sustainable future through Amazon
            Second Life Commerce.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="bg-[#FF9900] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#e88a00]"
            >
              View All Orders
            </button>

            <button
              onClick={() => navigate("/my-returns")}
              className="bg-[#FF9900] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#e88a00]"
            >
              My Returns
            </button>
          </div>
        </div>
      </div>

      {/* Recent Orders */}

      <div className="px-8 mt-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#131921]">Recent Orders</h2>

          <button
            onClick={() => navigate("/orders")}
            className="text-[#FF9900] font-semibold"
          >
            View All →
          </button>
        </div>

        <div className="space-y-6">
          {loading ? (
            <p className="text-gray-500">Loading orders...</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-gray-500">No recent orders found.</p>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-5xl">
                      {order.image}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">{order.name}</h3>

                      <p className="text-gray-500 text-sm">
                        Order #{order.orderId}
                      </p>

                      <p className="text-gray-500 text-sm mt-1">
                        Delivered {order.delivered}
                      </p>

                      <p className="font-bold text-xl mt-3">{order.price}</p>

                      <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Delivered
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/return")}
                    className="bg-[#FF9900] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#e88a00]"
                  >
                    Return Item
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sustainability Impact */}

      <div className="px-8 mt-12 pb-10">
        <h2 className="text-3xl font-bold text-[#131921] mb-6">
          Your Sustainability Impact
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Package size={32} className="text-[#FF9900] mb-4" />

            <h3 className="text-4xl font-bold">{sustainability.totalReturns}</h3>

            <p className="text-gray-500 mt-2">Products Returned</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Award size={32} className="text-[#FF9900] mb-4" />

            <h3 className="text-4xl font-bold">{sustainability.totalCredits}</h3>

            <p className="text-gray-500 mt-2">Credits Earned</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <Leaf size={32} className="text-[#FF9900] mb-4" />

            <h3 className="text-4xl font-bold">{sustainability.totalCO2}kg</h3>

            <p className="text-gray-500 mt-2">CO₂ Saved</p>
          </div>
        </div>
      </div>
    </div>
  );
}
