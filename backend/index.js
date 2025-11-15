import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(port, () => {
  connectDB();
  console.log("started");
});
