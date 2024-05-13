require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import studentRouter from "./routes/student.routes";

const app: Application = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://teacher-attendance-frontend.vercel.app",
    "https://student-attendance-fe.vercel.app",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.get("/", async (req, res) => {
  res.status(200).json("Health check endpoint for the server test 2");
});

app.use("/api/v1/students", studentRouter);

export { app };
