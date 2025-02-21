const express = require("express");

const app = express();
const PORT = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// CORS Middleware
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return fn(req, res);
};

// POST /bfhl API
const postBfhl = (req, res) => {
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

    const response = {
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
      data,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
};

// GET /bfhl API
const getBfhl = (req, res) => {
  res.status(200).json({ operation_code: 1 });
};

// Use allowCors wrapper on routes
app.post("/bfhl", allowCors(postBfhl));
app.get("/bfhl", allowCors(getBfhl));

// Start the server locally
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel deployment
module.exports = app;
