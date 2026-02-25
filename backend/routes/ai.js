const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");
const pool = require("../db");

const router = express.Router();

router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Missing video data" });
    }

    const prompt = `
You are a social media content repurposing expert.

Based on this YouTube video:

Title: ${title}
Description: ${description}

Generate:
1. 5 short viral clip ideas
2. A Twitter post
3. A LinkedIn post
4. A short newsletter summary
5. 10 relevant hashtags

Clearly separate each section.
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": process.env.GEMINI_API_KEY,
        },
      },
    );

    const aiText = response.data.candidates[0].content.parts[0].text;

// Save to database
await pool.query(
  "INSERT INTO generations (user_id, video_title, video_url, generated_content) VALUES ($1, $2, $3, $4)",
  [
    req.user.id,
    title,
    req.body.url || "N/A",
    aiText
  ]
);

res.json({ content: aiText });
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    res.status(500).json({ message: "AI generation failed" });
  }
});

module.exports = router;
