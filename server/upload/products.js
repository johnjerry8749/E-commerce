import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// MAIN IMAGE
const mainStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "E_commerce/Product_img",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// IMAGE ONE
const imageOneStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "E_commerce/Pimg_one",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// IMAGE TWO
const imageTwoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "E_commerce/Pimg_two",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// IMAGE THREE
const imageThreeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "E_commerce/Pimg_three",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

export const uploadMain = multer({
  storage: mainStorage,
});

export const uploadOne = multer({
  storage: imageOneStorage,
});

export const uploadTwo = multer({
  storage: imageTwoStorage,
});

export const uploadThree = multer({
  storage: imageThreeStorage,
});
