const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: __dirname + "/.env" });

const studentRoutes = require("./routes/students");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve generated API docs statically
app.use("/docs", express.static("docs"));

// Routes
app.use("/api/students", studentRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Student Management API is running!" });
});

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📄 API Docs at http://localhost:${PORT}/docs`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });