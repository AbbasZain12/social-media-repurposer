import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function History() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/history",
          {
            headers: { Authorization: token },
          }
        );

        setData(res.data);
      } catch {
        setError("Failed to load history.");
      }
    };

    fetchHistory();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex justify-center items-start py-20">

      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10">

        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Your Content History
        </h1>

        {error && (
          <p className="text-red-500 mb-6">{error}</p>
        )}

        {data.length === 0 ? (
          <p className="text-gray-600 text-center">
            No history found. Generate some content first.
          </p>
        ) : (
          <div className="space-y-8">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.video_title}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                </div>

                <p className="text-indigo-600 text-sm mb-4 break-all">
                  {item.video_url}
                </p>

                <div className="bg-white p-4 rounded-xl border border-gray-200 max-h-80 overflow-y-auto whitespace-pre-wrap text-gray-700">
                  {item.generated_content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}