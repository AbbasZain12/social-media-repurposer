const authMiddleware = require("../middleware/authMiddleware");


const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/video", authMiddleware, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "YouTube URL required" });
    }

    // Extract video ID
    const getVideoId = (url) => {
  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const videoId = getVideoId(url);


    if (!videoId) {
      return res.status(400).json({ message: "Invalid YouTube URL" });
    }

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: "snippet",
          id: videoId,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    if (response.data.items.length === 0) {
      return res.status(404).json({ message: "Video not found" });
    }

    const video = response.data.items[0].snippet;

    res.json({
      title: video.title,
      description: video.description,
      channel: video.channelTitle,
      thumbnail: video.thumbnails.high.url,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
