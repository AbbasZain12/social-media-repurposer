import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch {
      setError("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-pink-600 to-purple-600">
      <h1 className="text-white text-3xl font-extrabold tracking-widest mb-8 text-center uppercase">
        Social Media Repurposer
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl flex w-[900px] overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-1/2 bg-purple-700 text-white p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6">Join Us 🚀</h1>
          <p className="opacity-80 leading-relaxed">
            Start repurposing your content and grow across platforms
            automatically.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 p-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-8">
            Create your account
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-600 font-semibold cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
