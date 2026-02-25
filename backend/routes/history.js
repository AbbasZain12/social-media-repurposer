const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM generations WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

module.exports = router;