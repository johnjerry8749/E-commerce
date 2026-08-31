import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from 'dotenv';
import './config/db.js';
import routes from './routes/index.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: process.env.FrontEndUrl, // it Process your frontend URL on .env
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});