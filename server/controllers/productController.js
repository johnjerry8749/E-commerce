import { productValidator } from "../validators/productValidator.js";
import { createProduct as createProductModel } from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    // ================================
    // VALIDATION
    // ================================

    const errors = productValidator(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // ================================
    // PRODUCT DETAILS
    // ================================

    const {
      name,
      description,
      price,
      category,
      subcategory,
      size,
      bestseller,
    } = req.body;

    // ================================
    // MAIN IMAGE
    // ================================

    const mainImage = req.file;

    if (!mainImage) {
      return res.status(400).json({
        success: false,
        message: "Main image is required",
      });
    }

    const mainImageUrl = mainImage.path;

    // ================================
    // OTHER IMAGES
    // ================================

    const otherImages = req.files;

    if (!otherImages || otherImages.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least two other images are required",
      });
    }

    const otherImageUrls = otherImages.map((file) => file.path);

    // ================================
    // CREATE PRODUCT
    // ================================

    const newProduct = await createProductModel(
      name,
      description,
      price,
      category,
      subcategory,
      size,
      bestseller,
      mainImageUrl,
      otherImageUrls,
    );

    // ================================
    // RESPONSE
    // ================================

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
