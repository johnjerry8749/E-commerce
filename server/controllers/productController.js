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
// CREATE PRODUCT
// ========================================
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      stock,
      bestseller,
    } = req.body;

    // ========================================
    // VALIDATE REQUIRED FIELDS
    // ========================================
    if (!name || !description || !price || !category || !subCategory) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required product fields",
      });
    }

    // ========================================
    // CHECK IMAGES
    // ========================================
    if(!req.files?.mainImages?.[0]){
      return res.status(400).json({
        success: false,
        message: "main Image is Required",
      })
    }
    // ========================================
    // GET IMAGE URLS
    // ========================================
    const mainImageUrl = req.files.mainImage[0].path;


        // ========================================
    // OTHER IMAGES
    // ========================================
    const oterImages = req.files?.otherImages || [];
    if (otherImages.length < 2){
      return res.status(400).json({
        success: false,
        message: "At least Two Other Images are required",
      })
    }
    const otherImagesUrls = otherImages.map((file) => file.path)

    // ========================================
    // PARSE SIZES
    // ========================================
    let parsedSizes = [];

    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (error) {
        parsedSizes = sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean);
      }
    }

    // ========================================
    // PARSE BESTSELLER
    // ========================================
    const isBestseller =
      bestseller === "true" ||
      bestseller === true;

    // ========================================
    // CREATE PRODUCT
    // ========================================
    const newProduct = await createProductModel(
      name.trim(),
      description.trim(),
      Number(price),
      category,
      subCategory,
      parsedSizes,
      isBestseller,
      Number(stock) || 0,
      mainImageUrl,
      otherImageUrls
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
    const {
      category,
      subCategory,
    } = req.query;

    let products;

    // ========================================
    // FILTER PRODUCTS
    // ========================================
    if (category || subCategory) {
      products = await filterProducts({
        category,
        subCategory,
      });
    } else {
      products = await getAllProducts();
    }

    // ========================================
    // RESPONSE
    // ========================================
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

    // ========================================
    // FIND PRODUCT
    // ========================================
    const product = await getProductById(id);

    // ========================================
    // PRODUCT NOT FOUND
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
      subCategory,
      sizes,
      stock,
      bestseller,
    } = req.body;

    // ========================================
    // PARSE SIZES
    // ========================================
    let parsedSizes = sizes;

    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch (error) {
        parsedSizes = sizes
          .split(",")
          .map((size) => size.trim())
          .filter(Boolean);
      }
    }

    // ========================================
    // PARSE BESTSELLER
    // ========================================
    const isBestseller =
      bestseller === "true" ||
      bestseller === true;

    // ========================================
    // IMAGE UPDATES
    // ========================================
    let mainImage = null;
    let otherImages = null;

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(
        (file) => file.path
      );

      mainImage = imageUrls[0];
      otherImages = imageUrls.slice(1);
    }

    // ========================================
    // UPDATE PRODUCT
    // ========================================
    const product = await updateProductModel(
      req.params.id,
      name?.trim(),
      description?.trim(),
      price ? Number(price) : undefined,
      category,
      subCategory,
      parsedSizes,
      isBestseller,
      stock !== undefined
        ? Number(stock)
        : undefined,
      mainImage,
      otherImages
    );

    // ========================================
    // PRODUCT NOT FOUND
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

    // ========================================
    // DELETE PRODUCT
    // ========================================
    const product = await deleteProductModel(id);

    // ========================================
    // PRODUCT NOT FOUND
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
    // ========================================
    // GET BEST SELLERS
    // ========================================
    const products = await bestSellers();

    // ========================================
    // RESPONSE
    // ========================================
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