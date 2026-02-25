import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [aiContent, setAiContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleFetchVideo = async () => {
    try {
      setError("");
      const res = await axios.post(
        "http://localhost:5000/api/youtube/video",
        { url },
        {
          headers: { Authorization: token },
        },
      );

      setVideoData(res.data);
    } catch (err) {
      setError("Failed to fetch video details.");
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/ai/generate",
        {
          title: videoData.title,
          description: videoData.description,
          url: url,
        },
        {
          headers: { Authorization: token },
        },
      );

      setAiContent(res.data.content);
    } catch (err) {
      setError("AI generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex justify-center items-start py-20">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-10">
        <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">
          Repurpose Your YouTube Content
        </h1>

        {/* URL Input */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Paste YouTube video URL"
            className="flex-1 p-3 rounded-xl bg-white/20 border border-purple-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={handleFetchVideo}
            className="px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-purple-700 hover:text-white transition duration-300"
          >
            Fetch
          </button>
        </div>

        {/* Video Info */}
        {videoData && (
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">{videoData.title}</h2>
            <p className="text-gray-600">{videoData.description}</p>

            <button
              onClick={handleGenerate}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Generate Content
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-indigo-600 font-medium">
            Generating content... please wait.
          </p>
        )}

        {/* Error */}
        {error && <p className="text-red-500 font-medium">{error}</p>}

        {/* AI Content */}
        {aiContent && (
          <div className="mt-8 bg-white/10 p-6 rounded-2xl border border-white/20 max-h-96 overflow-y-auto whitespace-pre-wrap">
            <h2 className="text-xl font-semibold mb-4">Generated Content</h2>

            <div className="whitespace-pre-wrap text-gray-700">{aiContent}</div>
          </div>
        )}
      </div>
    </div>
  );
}
