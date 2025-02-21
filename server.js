const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Enable CORS middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    allowedHeaders:
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Handle OPTIONS preflight requests
app.options("*", cors());

// POST /bfhl API
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    const user_id = "john_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    const numbers = data.filter((item) => !isNaN(item)).map(String);
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

    const highestAlphabet = alphabets.length
      ? [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop()]
      : [];

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
      data,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

// GET /bfhl API
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server locally (Not needed for Vercel, but useful for local testing)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel deployment
module.exports = app;
