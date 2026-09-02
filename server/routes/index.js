import { Router } from "express";

import authRouter from "./authRoutes.js";
import cartRouter from "./cartRoutes.js";
import orderRouter from "./orderRoutes.js";
import productRouter from "./productRoutes.js";
import adminRouter from "./adminRoutes.js";

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

// ========================================
// PRODUCT ROUTES
// ========================================
router.use("/products", productRouter);

// ========================================
// ADMIN ROUTES
// ========================================
router.use("/admin", adminRouter);

export default router;