import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { uploadProductImages } from "../upload/products.js";
import { productValidator } from "../validators/productValidator.js";
import { validationResult } from "express-validator";

import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getBestSellers,
} from "../controllers/productController.js";

const router = Router();

// Helper to run express-validator
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// PUBLIC
router.get("/", getProducts);
router.get("/best-sellers", getBestSellers);
router.get("/:id", getProduct);

// ADMIN
router.post(
  "/",
  protect,
  adminOnly,
  uploadProductImages,
  productValidator,
  validate,
  createProduct
);

router.put(
  "/:id",
  protect,
  adminOnly,
  uploadProductImages,
  updateProduct
);

router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;