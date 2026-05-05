const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ debug: false });
const router = require("./routes/BookRouter");

const cors = require("cors");

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);

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

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const port = process.env.PORT || 4000;

app.use((error, req, res, next) => {
  res.status(500).json({
    success: false,
    error: true,
    message: error.message || "Internal Server Error",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected successfully");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
