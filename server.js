import dotenv from "dotenv";
dotenv.config(); // MUST be first

import express from "express";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/authroute.js";
import bookingroutes from "./routes/bookingroute.js";
import cors from "cors";
import { ownerform } from "./controller/ownerformcontroller.js";
import ownerformroutes from "./routes/ownerformroute.js";
import filteramenitiesroutes from "./routes/filteramenetiesroute.js";

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/auth/v1", bookingroutes);
app.use("/api/ownerform",ownerformroutes)
app.use('/api/auth/filters',filteramenitiesroutes);

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:");
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
