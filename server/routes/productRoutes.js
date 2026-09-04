import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { uploadProductImages } from "../upload/products.js";

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
router.post("/", protect, adminOnly, uploadProductImages, createProduct);
router.put("/:id", protect, adminOnly, uploadProductImages, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;