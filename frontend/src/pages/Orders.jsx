import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingBag, Search } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const EMOJI_MAP = {
  Electronics: "📱",
  Fashion:     "👟",
  Furniture:   "🪑",
};

export default function Orders() {
  const navigate = useNavigate();

  const [orders,  setOrders]  = useState([]);
  const [search,  setSearch]  = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/marketplace`);

        const items = res.data.map((item) => ({
  _id: item._id,          // add this
  id: item._id,
  name: item.name,
  category: item.category,
  orderId: item._id.slice(-8).toUpperCase(),
  delivered: new Date(item.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  price: `₹${item.originalPrice.toLocaleString("en-IN")}`,
  image: EMOJI_MAP[item.category] || "📦",
  description: item.description || "",
}));

        setOrders(items);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2F3F3] p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <ShoppingBag size={28} className="text-[#FF9900]" />
        <h1 className="text-4xl font-bold text-[#131921]">My Orders</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        View and manage your delivered orders. Click "Return Item" to start a return.
      </p>

      {/* Search bar */}
      <div className="flex items-center bg-white rounded-xl shadow-sm px-4 py-3 mb-8 gap-3 max-w-md">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product or category..."
          className="outline-none text-sm w-full bg-transparent text-gray-700"
        />
      </div>

      {/* Orders list */}
      <div className="space-y-5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse h-32" />
          ))
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
            <ShoppingBag size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">
              {search ? `No orders matching "${search}"` : "No orders found."}
            </p>
          </div>
        ) : (
          filtered.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div className="flex items-center gap-6">

                {/* Product emoji */}
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-4xl border">
                  {order.image}
                </div>

                {/* Details */}
                <div>
                  <h2 className="text-lg font-bold text-[#131921]">{order.name}</h2>

                  {order.description && (
                    <p className="text-gray-400 text-xs mt-0.5">{order.description}</p>
                  )}

                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-gray-400 text-sm">Order #{order.orderId}</span>
                    <span className="text-gray-400 text-sm">·</span>
                    <span className="text-gray-400 text-sm">Delivered {order.delivered}</span>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <p className="font-bold text-lg text-[#131921]">{order.price}</p>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      ✓ Delivered
                    </span>
                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">
                      {order.category}
                    </span>
                  </div>
                </div>

              </div>

              <button
  onClick={() => {
    console.log("Sending order:", order);

    navigate("/return", {
      state: { order }
    });
  }}
  className="bg-[#FF9900] hover:bg-[#e88a00] text-black px-5 py-3 rounded-xl font-semibold text-sm transition whitespace-nowrap"
>
  Return Item
</button>

            </div>
          ))
        )}
      </div>

    </div>
  );
}