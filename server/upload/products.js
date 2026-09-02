import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ========================================
// MAIN IMAGE
// ========================================

const mainStorage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "E_commerce/Product_img",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// ========================================
// OTHER IMAGES
// ========================================

const otherImageFolders = [
  "E_commerce/Pimg_one",
  "E_commerce/Pimg_two",
  "E_commerce/Pimg_three",
];

const otherImageStorages = otherImageFolders.map(
  (folder) =>
    new CloudinaryStorage({
      cloudinary,

      params: {
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      },
    }),
);

// ========================================
// MAIN IMAGE
// ========================================

export const uploadMain = multer({
  storage: mainStorage,
});

// ========================================
// OTHER IMAGES
// ========================================

export const uploadOtherImages = multer({
  storage: otherImageStorages[0],
}).array("otherImages", 3);
