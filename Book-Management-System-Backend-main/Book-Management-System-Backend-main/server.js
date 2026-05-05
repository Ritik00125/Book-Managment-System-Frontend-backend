const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./routes/BookRouter");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: false,
  }),
);

// ✅ Test route
app.get("/", (req, res) => {
  res.json({
    name: "Book Management System API",
    status: "ok",
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/", router);

// ✅ Error handler
app.use((error, req, res, next) => {
  res.status(500).json({
    success: false,
    error: true,
    message: error.message || "Internal Server Error",
  });
});

// ✅ PORT (Railway compatible)
const PORT = process.env.PORT || 8080;

// ❗ MongoDB connect + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);

    // ❗ Important: server still start ho jaye (debug ke liye)
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running without DB on port ${PORT}`);
    });
  });
