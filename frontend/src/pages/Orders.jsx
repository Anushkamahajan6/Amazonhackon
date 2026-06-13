import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      name: "iPhone 13",
      orderId: "A67B34E2F",
      delivered: "12 June 2026",
      price: "₹52,000",
      image: "📱",
    },
    {
      id: 2,
      name: "Boat Headphones",
      orderId: "B82K45G9M",
      delivered: "5 June 2026",
      price: "₹1,999",
      image: "🎧",
    },
    {
      id: 3,
      name: "Dell Laptop",
      orderId: "C78L90MN2",
      delivered: "28 May 2026",
      price: "₹68,000",
      image: "💻",
    },
    {
      id: 4,
      name: "Samsung Monitor",
      orderId: "D34RT56HJ",
      delivered: "18 May 2026",
      price: "₹14,999",
      image: "🖥️",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F3F3] p-8">

      <h1 className="text-4xl font-bold text-[#131921] mb-2">
        My Orders
      </h1>

      <p className="text-gray-600 mb-8">
        View and manage your orders.
      </p>

      <div className="space-y-6">

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center"
          >
            <div className="flex items-center gap-6">

              <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-5xl">
                {order.image}
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  {order.name}
                </h2>

                <p className="text-gray-500">
                  Order #{order.orderId}
                </p>

                <p className="text-gray-500">
                  Delivered on {order.delivered}
                </p>

                <p className="font-bold mt-2">
                  {order.price}
                </p>
              </div>

            </div>

            <button
              onClick={() =>
                navigate("/return", {
                  state: { order },
                })
              }
              className="bg-[#FF9900] text-black px-5 py-3 rounded-lg font-semibold"
            >
              Return Item
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}