import { useLocation, useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function ReturnRequest() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  const [reason, setReason] = useState("");
  const [comments, setComments] = useState("");
  const [image, setImage] = useState(null);

  return (
    <div className="min-h-screen bg-[#F2F3F3] p-8">

      <h1 className="text-4xl font-bold text-[#131921] mb-2">
        Return Request
      </h1>

      <p className="text-gray-600 mb-8">
        Submit product details for AI analysis.
      </p>

      {/* Product Card */}

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Product Information
        </h2>

        <div className="flex items-center gap-6">

          <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-5xl">
            {order?.image}
          </div>

          <div>

            <h3 className="text-xl font-bold">
              {order?.name}
            </h3>

            <p className="text-gray-500">
              Order #{order?.orderId}
            </p>

            <p className="font-semibold mt-2">
              {order?.price}
            </p>

          </div>

        </div>

      </div>

      {/* Return Form */}

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <h2 className="text-2xl font-bold mb-6">
          Return Details
        </h2>

        {/* Reason */}

        <div className="mb-6">

          <label className="block mb-2 font-medium">
            Reason for Return
          </label>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="">
              Select Reason
            </option>

            <option>
              Damaged Product
            </option>

            <option>
              Wrong Item Received
            </option>

            <option>
              Product Not Working
            </option>

            <option>
              No Longer Needed
            </option>

          </select>

        </div>

        {/* Upload */}

        <div className="mb-6">

          <label className="block mb-2 font-medium">
            Upload Product Images
          </label>

          <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center cursor-pointer">

            <Upload size={40} />

            <p className="mt-2 text-gray-500">
              Click to upload images
            </p>

            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
            />

          </label>

          {image && (
            <p className="mt-3 text-green-600">
              {image.name}
            </p>
          )}

        </div>

        {/* Comments */}

        <div className="mb-8">

          <label className="block mb-2 font-medium">
            Additional Comments
          </label>

          <textarea
            rows={4}
            value={comments}
            onChange={(e) =>
              setComments(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            placeholder="Describe the issue..."
          />

        </div>

        <button
          onClick={() => navigate("/analyzing")}
          className="bg-[#FF9900] text-black px-8 py-4 rounded-lg font-semibold"
        >
          Analyze Product
        </button>

      </div>

    </div>
  );
}