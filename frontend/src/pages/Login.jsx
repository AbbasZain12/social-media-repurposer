import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      console.log(err.response?.data || err.message);
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-purple-600  to-pink-600">
      <h1 className="text-white text-3xl font-extrabold tracking-widest mb-8 text-center uppercase">
        Social Media Repurposer
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl flex w-[900px] overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-1/2 bg-indigo-700 text-white p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">Welcome Back 👋</h1>
          <p className="opacity-80 leading-relaxed">
            Turn your YouTube videos into powerful social media content
            instantly. Save time. Grow faster. Automate your creativity.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 p-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-8">
            Login to your account
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-600 font-semibold cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
