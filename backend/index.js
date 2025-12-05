// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./db/dbConnection.js";
// import authRouter from "./routes/auth.route.js";
// dotenv.config();

// const PORT = process.env.PORT || 3000;
// const app = express();

// app.use(cookieParser());
// app.use(express.json());

// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// app.use("/api/v1/auth", authRouter);

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server running on port ${PORT}`);
// });

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Something went wrong on the server";
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/dbConnection.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/v1/auth", authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong on the server";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
