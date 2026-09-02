import { Router } from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getUserCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItemfromCart,
  updateCartItem,
  clearUserCart,
} from "../controllers/cartController.js";

const router = Router();

// ========================================
// PROTECT ALL CART ROUTES
// ========================================
router.use(protect);

// ========================================
// GET USER CART
// GET /api/cart
// ========================================
router.get("/", getUserCart);

// ========================================
// ADD ITEM TO CART
// POST /api/cart
// ========================================
router.post("/", addItemToCart);

// ========================================
// UPDATE CART ITEM QUANTITY
// PUT /api/cart/quantity/:cartItemId
// ========================================
router.put(
  "/quantity/:cartItemId",
  updateCartItemQuantity
);

// ========================================
// UPDATE CART ITEM
// PUT /api/cart/item/:cartItemId
// ========================================
router.put(
  "/item/:cartItemId",
  updateCartItem
);

// ========================================
// REMOVE CART ITEM
// DELETE /api/cart/:cartItemId
// ========================================
router.delete(
  "/:cartItemId",
  removeCartItemfromCart
);

// ========================================
// CLEAR USER CART
// DELETE /api/cart
// ========================================
router.delete("/", clearUserCart);

export default router;