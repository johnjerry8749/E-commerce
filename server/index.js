import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";

import "./config/db.js";
import routes from "./routes/index.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE
// ========================================

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: process.env.FrontEndUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// Logger
app.use(morgan("dev"));

// Security
app.use(helmet());

// Cookies
app.use(cookieParser());

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Change to true when using HTTPS
      httpOnly: true,
    },
  }),
);

// ========================================
// API ROUTES
// ========================================
app.use("/api", routes);

// ========================================
// ERROR HANDLING
// ========================================

// Route not found
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
