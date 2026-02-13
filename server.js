import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authroute.js";
import bookingroutes from "./routes/bookingroute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


connectDB();


app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/auth/v1",bookingroutes)


app.get("/", (req, res) => {
  res.send("Server is running");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
