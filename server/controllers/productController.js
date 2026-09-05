import {
  createProduct as createProductModel,
  getAllProducts,
  getProductById,
  updateProduct as updateProductModel,
  deleteProduct as deleteProductModel,
  bestSellers,
  filterProducts,
} from "../models/Product.js";

// ========================================
// PARSE PRODUCT SIZES
// ========================================
const parseSizes = (size) => {
  if (!size) {
    return [];
  }

  // Already an array
  if (Array.isArray(size)) {
    return [
      ...new Set(
        size
          .map((item) => String(item).trim())
          .filter(Boolean)
      ),
    ];
  }

  // JSON string
  if (typeof size === "string") {
    try {
      const parsed = JSON.parse(size);

      if (Array.isArray(parsed)) {
        return [
          ...new Set(
            parsed
              .map((item) => String(item).trim())
              .filter(Boolean)
          ),
        ];
      }

      if (parsed) {
        return [String(parsed).trim()];
      }
    } catch {
      // Continue below
    }

    // Comma-separated string
    return [
      ...new Set(
        size
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      ),
    ];
  }

  return [];
};

// ========================================
// CONVERT BESTSELLER TO BOOLEAN
// ========================================
const parseBestseller = (bestseller) => {
  return (
    bestseller === true ||
    bestseller === "true" ||
    bestseller === "on" ||
    bestseller === "1"
  );
};

// ========================================
// CREATE PRODUCT
// ========================================
export const createProduct = async (req, res) => {
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
    // MAIN IMAGE
    // ========================================
    if (
      !req.files ||
      !req.files.mainImage ||
      !req.files.mainImage[0]
    ) {
      return res.status(400).json({
        success: false,
        message: "Main image is required",
      });
    }

    const mainImageUrl =
      req.files.mainImage[0].path;

    // ========================================
    // OTHER IMAGES
    // ========================================
    const otherImages =
      req.files.otherImages || [];

    if (otherImages.length < 1) {
      return res.status(400).json({
        success: false,
        message: "At least one other image is required",
      });
    }

    const otherImageUrls = otherImages.map(
      (file) => file.path
    );

    // ========================================
    // PARSE SIZES
    // ========================================
    const parsedSize = parseSizes(size);

    // ========================================
    // BESTSELLER
    // ========================================
    const isBestseller =
      parseBestseller(bestseller);

    // ========================================
    // CREATE PRODUCT
    // ========================================
    const newProduct =
      await createProductModel(
        name,
        description,
        price,
        category,
        subcategory,
        parsedSize,
        isBestseller,
        mainImageUrl,
        otherImageUrls
      );

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(
      "Create Product Error:",
      error
    );

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
    const {
      category,
      subcategory,
    } = req.query;

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
    console.error(
      "Get Products Error:",
      error
    );

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

    const product =
      await getProductById(id);

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
    console.error(
      "Get Product Error:",
      error
    );

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
    // MAIN IMAGE
    // ========================================
    let mainImage = null;

    if (req.files?.mainImage?.[0]) {
      mainImage =
        req.files.mainImage[0].path;
    }

    // ========================================
    // OTHER IMAGES
    // ========================================
    let otherImages = null;

    if (req.files?.otherImages?.length) {
      otherImages =
        req.files.otherImages.map(
          (file) => file.path
        );
    }

    // ========================================
    // PARSE SIZES
    // ========================================
    const parsedSize = parseSizes(size);

    // ========================================
    // BESTSELLER
    // ========================================
    const isBestseller =
      parseBestseller(bestseller);

    // ========================================
    // UPDATE PRODUCT
    // ========================================
    const product =
      await updateProductModel(
        req.params.id,
        name,
        description,
        price,
        category,
        subcategory,
        parsedSize,
        isBestseller,
        mainImage,
        otherImages
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(
      "Update Product Error:",
      error
    );

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

    const product =
      await deleteProductModel(id);

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
    console.error(
      "Delete Product Error:",
      error
    );

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
    console.error(
      "Best Sellers Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};