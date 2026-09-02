import {
  createProduct as createProductModel,
  getAllProducts,
  getProductById,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel,
  bestSellers,
  filterProducts,
} from "../models/Product.js";

import { productValidator } from "../validators/productValidator.js";

// ========================================
// CREATE PRODUCT
// ========================================
export const createProduct = async (req, res) => {
  try {
    // ========================================
    // VALIDATION
    // ========================================
    const errors = productValidator(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // ========================================
    // PRODUCT DETAILS
    // ========================================
    const {
      name,
      description,
      price,
      category,
      subcategory,
      size,
      bestseller,
    } = req.body;

    // ========================================
    // MAIN IMAGE
    // ========================================
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Main image is required",
      });
    }

    const mainImageUrl = req.file.path;

    // ========================================
    // OTHER IMAGES
    // ========================================
    const otherImages = req.files;

    if (!otherImages || otherImages.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least two other images are required",
      });
    }

    const otherImageUrls = otherImages.map((file) => file.path);

    // ========================================
    // CREATE PRODUCT
    // ========================================
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

    // ========================================
    // RESPONSE
    // ========================================
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
      error: error.message,
    });
  }
};

// ========================================
// GET ALL PRODUCTS
// ========================================
export const getProducts = async (req, res) => {
  try {
    const { category, subcategory } = req.query;

    let products;

    if (category || subcategory) {
      products = await filterProducts({
        category,
        subcategory,
      });
    } else {
      products = await getAllProducts();
    }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE PRODUCT
// ========================================
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE PRODUCT
// ========================================
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      size,
      bestseller,
    } = req.body;

    // ========================================
    // OPTIONAL IMAGE UPDATES
    // ========================================
    const mainImage = req.file ? req.file.path : null;

    const otherImages = req.files ? req.files.map((file) => file.path) : null;

    // ========================================
    // UPDATE PRODUCT
    // ========================================
    const product = await updateProductModel(
      req.params.id,
      name,
      description,
      price,
      category,
      subcategory,
      size,
      bestseller,
      mainImage,
      otherImages,
    );

    // ========================================
    // CHECK PRODUCT
    // ========================================
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ========================================
    // RESPONSE
    // ========================================
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// DELETE PRODUCT
// ========================================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await deleteProductModel(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ========================================
// BEST SELLERS
// ========================================
export const getBestSellers = async (req, res) => {
  try {
    const products = await bestSellers();

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Best Sellers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
