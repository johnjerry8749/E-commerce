import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware";
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getBestSellers,
} from "../controllers/productController.js";
import { uploadProductImages } from "../upload/products.js"


const router = Router();

//Public Routes 
router.get("/", getProducts);
router.get("bestsellers", getBestSellers);
router.get("/:id", getProduct);


//admin Only routes to create and upload product image

router.post("/", protect, adminOnly,uploadProductImages, createProduct);

router.put("/:id", protect, adminOnly, updateProduct)
router.delete("/:id", protect, adminOnly, deleteProduct)


export default Router