import { CheckCircle, XCircle, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function Returns() {
  const [showOverride, setShowOverride] = useState(false);
  const [overrideItem, setOverrideItem] = useState(null);
  const [newDecision, setNewDecision] = useState("");
  const [overrideReason, setOverrideReason] = useState("");
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [returnsData, setReturnsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        // Fetch real Return documents from the database
        const res = await axios.get(`${API_BASE}/api/admin/analytics/recent-returns`);

        const CONDITION_SCORE = { A: 92, B: 74, C: 48 };
        const DAMAGE_MAP = {
          A: ["Minor scratch on back panel"],
          B: ["Battery health below 80%", "Minor wear on casing"],
          C: ["Multiple component failures", "Severe physical damage"],
        };
        const REASONING_MAP = {
          A: "Product is fully functional with minimal cosmetic wear. Ready for direct resale.",
          B: "Requires component replacement before resale. Refurbishment recommended.",
          C: "Product has significant damage. Recycling is the most sustainable option.",
        };

        const mapped = res.data.map((ret, index) => ({
          id:             index,                           // positional index as key
          product:        ret.product,                    // real name from Return.itemId
          category:       ret.category || "Electronics",  // from populated item
          grade:          ret.grade,                      // real conditionGrade from DB
          conditionScore: CONDITION_SCORE[ret.grade] ?? 70,
          decision:       ret.decision,                   // real disposition from DB
          credits:        ret.credits,                    // calculated by backend controller
          damage:         DAMAGE_MAP[ret.grade]    ?? ["Condition details unavailable"],
          overrideReason: "",
          reasoning:      REASONING_MAP[ret.grade] ?? "Assessment based on condition grade.",
        }));

        setReturnsData(mapped);
      } catch (error) {
        console.error("Error fetching returns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);
  return (
    <div className="p-6 bg-[#F2F3F3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#131A22] mb-2">
        Returns Review Queue
      </h1>

      <div className="mb-6">
        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">
          Pending Reviews: {returnsData.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#232F3E] text-white">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Grade</th>
              <th className="p-4 text-left">AI Decision</th>
              <th className="p-4 text-left">Credits</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {returnsData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{item.product}</td>

                <td className="p-4">{item.category}</td>

                <td className="p-4">{item.grade}</td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {item.decision}
                  </span>
                </td>

                <td className="p-4">{item.credits}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedReturn(item)}
                      className="bg-blue-100 p-2 rounded-lg"
                    >
                      <Eye size={18} />
                    </button>
                    <button className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle size={18} />
                    </button>

                    <button className="bg-red-100 p-2 rounded-lg">
                      <XCircle size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedReturn && (
        <div className="fixed inset-0 bg-black/40 flex justify-end">
          <div className="w-[450px] bg-white h-full p-6 shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Return Review</h2>

              <button
                onClick={() => setSelectedReturn(null)}
                className="text-gray-500 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-5">
              <div className="mb-5">
                <img
                  src="https://via.placeholder.com/350x180"
                  alt="product"
                  className="rounded-lg w-full h-40 object-cover"
                />
              </div>

              <div>
                <p className="text-gray-500">Product</p>
                <p className="font-semibold">{selectedReturn.product}</p>
              </div>

              <div>
                <p className="text-gray-500">Category</p>
                <p>{selectedReturn.category}</p>
              </div>

              <div>
                <p className="text-gray-500">AI Grade</p>
                <p className="font-bold text-green-600">
                  Grade {selectedReturn.grade}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Condition Score</p>

                <div className="bg-gray-200 h-3 rounded-full mt-2">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${selectedReturn.conditionScore}%`,
                    }}
                  />
                </div>

                <p className="mt-1 text-sm">
                  {selectedReturn.conditionScore}/100
                </p>
              </div>

              <div>
                <p className="text-gray-500">Damage Findings</p>

                <ul className="list-disc ml-5 mt-2">
                  {selectedReturn.damage.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-gray-500">AI Decision</p>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {selectedReturn.decision}
                </span>
              </div>
              {selectedReturn.overrideReason && (
                <div>
                  <p className="text-gray-500">Override Reason</p>

                  <p className="mt-2 text-orange-600">
                    {selectedReturn.overrideReason}
                  </p>
                </div>
              )}

              <div>
                <p className="text-gray-500">AI Reasoning</p>

                <p className="mt-2">{selectedReturn.reasoning}</p>
              </div>

              <div>
                <p className="text-gray-500">Green Credits</p>

                <p className="font-bold text-[#FF9900]">
                  {selectedReturn.credits}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setReturnsData(
                      returnsData.filter(
                        (item) => item.id !== selectedReturn.id,
                      ),
                    );

                    setSelectedReturn(null);
                  }}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => {
                    setOverrideItem(selectedReturn);
                    setShowOverride(true);
                  }}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg"
                >
                  Override Decision
                </button>
              </div>
            </div>

            {showOverride && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-[500px]">
                  <h2 className="text-2xl font-bold mb-6">
                    Override AI Decision
                  </h2>

                  <div className="mb-4">
                    <p className="text-gray-500">Product</p>
                    <p className="font-semibold">{overrideItem?.product}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-500">Current AI Decision</p>
                    <p className="font-semibold text-green-600">
                      {overrideItem?.decision}
                    </p>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      New Decision
                    </label>

                    <select
                      value={newDecision}
                      onChange={(e) => setNewDecision(e.target.value)}
                      className="w-full border rounded-lg p-3"
                    >
                      <option value="">Select Decision</option>
                      <option value="Resell">Resell</option>
                      <option value="Refurbish">Refurbish</option>
                      <option value="Donate">Donate</option>
                      <option value="Recycle">Recycle</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 font-medium">Reason</label>

                    <textarea
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      rows={4}
                      placeholder="Explain why AI decision is being overridden..."
                      className="w-full border rounded-lg p-3"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowOverride(false)}
                      className="flex-1 border rounded-lg py-3"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        setReturnsData(
                          returnsData.map((item) =>
                            item.id === overrideItem.id
                              ? {
                                  ...item,
                                  decision: newDecision,
                                  overrideReason,
                                }
                              : item,
                          ),
                        );

                        setSelectedReturn({
                          ...overrideItem,
                          decision: newDecision,
                          overrideReason,
                        });

                        setShowOverride(false);
                        setOverrideReason("");
                        setNewDecision("");
                      }}
                      className="flex-1 bg-[#FF9900] text-white rounded-lg py-3"
                    >
                      Confirm Override
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
