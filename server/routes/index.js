import { Router } from "express";

import authRouter from "./authRoutes.js";
import cartRouter from "./cartRoutes.js";
import orderRouter from "./orderRoutes.js";

const router = Router();

// ========================================
// AUTH ROUTES
// ========================================
router.use("/auth", authRouter);

// ========================================
// CART ROUTES
// ========================================
router.use("/cart", cartRouter);

// ========================================
// ORDER ROUTES
// ========================================
router.use("/orders", orderRouter);

export default router;