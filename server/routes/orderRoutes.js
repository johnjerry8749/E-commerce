import { Router } from "express";

import { protect } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

import {
  placeOrder,
  getAllOrdersAdmin,
  getMyOrderById,
  getMyOrders,
  updateOrderStatusAdmin,
} from "../controllers/orderController.js";

const router = Router();

// ========================================
// PROTECT ALL ORDER ROUTES
// ========================================
router.use(protect);

// ========================================
// USER ROUTES
// ========================================

// Get logged-in user's orders
// GET /api/orders/my-orders
router.get("/my-orders", getMyOrders);

// Get single order belonging to logged-in user
// GET /api/orders/:orderId
router.get("/:orderId", getMyOrderById);

// Place order
// POST /api/orders
router.post("/", placeOrder);

// ========================================
// ADMIN ROUTES
// ========================================

// Get all orders
// GET /api/orders
router.get("/", adminMiddleware, getAllOrdersAdmin);

// Update order status
// PUT /api/orders/:orderId/status
router.put(
  "/:orderId/status",
  adminMiddleware,
  updateOrderStatusAdmin
);

export default router;