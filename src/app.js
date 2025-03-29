import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// Global Error Handler Middleware
import { ApiError } from "./utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  console.error(err); // Logs the error to the console (helps in debugging)

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
    });
  }

  // Default error response
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
  });
};


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

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server is Live",
  });
});

// routers import
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter); // localhost:8000/api/v1/users/register;


app.use(errorHandler);
export { app };
