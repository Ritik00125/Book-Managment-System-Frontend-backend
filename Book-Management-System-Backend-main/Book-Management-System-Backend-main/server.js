const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/BookRouter");

const cors = require("cors");
require("dotenv").config({ debug: false });

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

app.use("/", router);

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env");
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
      console.log(`server is connected on ${process.env.URL}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
