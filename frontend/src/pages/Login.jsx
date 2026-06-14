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
        "http://localhost:5000/api/users/login",
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
    <div className="min-h-screen flex items-center justify-center bg-[#F2F3F3]">

      <div className="bg-white p-10 rounded-xl shadow-lg text-center w-[400px]">

        <h1 className="text-3xl font-bold text-[#131A22] mb-3">
          Amazon Second Life
        </h1>

        <p className="text-gray-500 mb-6">
          Continue with Google
        </p>

        <button
          onClick={handleLogin}
          className="bg-[#FF9900] hover:bg-[#e68a00] text-white font-semibold px-6 py-3 rounded-lg w-full"
        >
          Sign in with Google
        </button>

      </div>

    </div>
  );
}