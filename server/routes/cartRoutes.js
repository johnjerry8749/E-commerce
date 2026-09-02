import { Router } from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  getUserCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItemfromCart,
  clearUserCart,
} from "../controllers/cartController.js";

const router = Router();

router.use(protect);

// ========================================
// GET USER CART
// ========================================
router.get("/", getUserCart);

// ========================================
// ADD ITEM TO CART
// ========================================
router.post("/", addItemToCart);

// ========================================
// UPDATE CART ITEM QUANTITY
// ========================================
router.put(
  "/quantity/:cartItemId",
  updateCartItemQuantity
);

// ========================================
// REMOVE CART ITEM
// ========================================
router.delete(
  "/:cartItemId",
  removeCartItemfromCart
);

// ========================================
// CLEAR CART
// ========================================
router.delete("/", clearUserCart);

export default router;