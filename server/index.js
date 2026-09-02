import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";

import pool from "./config/db.js";
import routes from "./routes/index.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const configuredOrigins = (
  process.env.FRONTEND_URL || process.env.FrontEndUrl || ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-blue-ten-17.vercel.app",
  ...configuredOrigins,
];

// ========================================
// MIDDLEWARE
// ========================================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(morgan("dev"));

app.use(helmet());

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  }),
);

// ========================================
// API ROUTES
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running",
  });
});

app.use("/api", routes);

// ========================================
// ERROR HANDLING
// ========================================

app.use(notFound);

app.use(errorHandler);

// ========================================
// START SERVER
// ========================================

const startServer = async () => {
  try {
    // Test database connection
    await pool.query("SELECT NOW()");

    console.log("========================================");
    console.log("PostgreSQL Database Connected");
    console.log("========================================");

    app.listen(PORT, () => {
      console.log("========================================");
      console.log(`Backend Server Started Successfully`);
      console.log("========================================");
    });
  } catch (error) {
    console.error("========================================");
    console.error(" Backend Failed to Start");
    console.error(" Database Connection Failed");
    console.error("========================================");
    console.error(error.message);

    process.exit(1);
  }
};

export default app;

if (!process.env.VERCEL) {
  startServer();
}