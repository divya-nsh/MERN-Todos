"use strict";
import "dotenv/config";
import express from "express";
import todoRouter from "./routes/todoRoute.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import { connectDB } from "./utils/connectDb.js";
import { errorHanlder } from "./middlewares/errorhandler.js";
import { apiError } from "./utils/error.js";

const app = express();
const port = process.env.PORT || 3000;

//------------------GLOBAl Middleware-------------//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*", maxAge: 86400 }),
);

//--------------------Routes----------------------//
app.use("/api/user", userRouter);
app.use("/api/todos", todoRouter);

app.use("/api/health", (req, res) => {
  res.status(200);
});

app.use((req, res, next) => {
  apiError(`Cannot ${req.method} ${req.path}`, 404);
});

app.use(errorHanlder);

app.listen(port, async () => {
  console.log(`Server is running port ${port}`);
  await connectDB();
});
