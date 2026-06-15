import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      const user = result.user;
      const response = await axios.post(
        "${API_BASE}/api/users/login",
        {
          name: user.displayName,
          email: user.email
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      if (response.data.role === "admin") {
        navigate("/dashboard");
      }
      else {
        navigate("/home");
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Navbar */}
      <div className="relative z-10 flex justify-between items-center px-10 py-5 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-[#131A22]">
            amazon
          </h1>

          <div className="h-10 w-[1px] bg-gray-300"></div>

          <h2 className="text-3xl font-bold text-green-600">
            SECOND LIFE
          </h2>
        </div>

        <div className="flex gap-8 text-gray-700">
          <span>Shop</span>
          <span>Sell</span>
          <span>About</span>
          <span>Sustainability</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 flex justify-center items-center h-[85vh]">

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden flex w-[950px]">

          {/* Left Panel */}
          <div className="w-[45%] bg-gradient-to-br from-[#131A22] to-[#0f2942] text-white p-10">

            <h1 className="text-5xl font-bold mb-4">
              Amazon
            </h1>

            <h2 className="text-3xl font-semibold mb-8">
              Second Life Commerce
            </h2>

            <p className="text-gray-300 leading-8">
              AI-powered return management platform
              helping Amazon reduce waste, recover value
              from returned products and reward
              sustainable consumer behavior.
            </p>

            <div className="mt-10 space-y-4">
              <p>✓ AI Product Grading</p>
              <p>✓ Smart Resale Decisions</p>
              <p>✓ Sustainability Credits</p>
              <p>✓ Trust Score Monitoring</p>
            </div>

          </div>

          {/* Right Panel */}
          <div className="flex-1 p-12 flex flex-col justify-center">

            <h2 className="text-4xl font-bold text-[#131A22] mb-3">
              Sign In
            </h2>

            <p className="text-gray-500 mb-8">
              Continue to Amazon Second Life Commerce
            </p>

            <button
              onClick={handleLogin}
              className="w-full bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold py-4 rounded-xl text-lg transition"
            >
              Continue with Google
            </button>

            <div className="mt-8 text-center text-gray-400 text-sm">
              Authorized Amazon Personnel & Customers Only
            </div>

          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-4 w-full text-center text-white text-sm">
        © 2026 Amazon Second Life Commerce
      </div>

    </div>
  );
}