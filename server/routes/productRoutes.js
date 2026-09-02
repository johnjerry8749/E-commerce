import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getBestSellers,
} from "../controllers/productController.js";

const router = Router();

// PUBLIC
router.get("/", getProducts);
router.get("/best-sellers", getBestSellers);
router.get("/:id", getProduct);

// ADMIN
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;