import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-pink-600 via-red-600 to-pink-600 text-white px-10 py-5 flex items-center justify-between shadow-lg">

      <div className="flex items-center space-x-6">
        <Link
          to="/dashboard"
          className="px-4 py-2 rounded-lg hover:bg-white/20 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/history"
          className="px-4 py-2 rounded-lg hover:bg-white/20 transition"
        >
          History
        </Link>
      </div>

      <h1 className="text-xl font-bold tracking-widest text-center">
        SOCIAL MEDIA REPURPOSER
      </h1>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-white text-purple-700 font-semibold hover:bg-purple-700 hover:text-white transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;