import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(json({ limit: "16Kb" }));
app.use(express.urlencoded({ extended: true, limit: "16Kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routers import
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter); // https://localhost:8000/api/v1/users/register;

export { app };
