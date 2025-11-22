import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
app.use(express.json());
app.use(cookieParser);

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("hello"); // controllers
});

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("Server started on port", port);
});
