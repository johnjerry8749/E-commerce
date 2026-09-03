import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ========================================
// CLOUDINARY STORAGE
// ========================================

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "E_commerce/Product_img",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// ========================================
// MULTER UPLOAD
// ========================================

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// ========================================
// EXPORTS
// ========================================

// Use this for create / update product
// Expects:
// - mainImage (single)
// - otherImages (array, up to 3)
export const uploadProductImages = upload.fields([
  { name: "mainImage", maxCount: 1 },
  { name: "otherImages", maxCount: 3 },
]);

export const uploadImages = upload.array("images", 4);

// Optional: if you ever need only the main image
export const uploadMainImage = upload.single("mainImage");