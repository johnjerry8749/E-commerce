import { body } from "express-validator";

export const productValidator = [
  // PRODUCT IMAGE
  body("images").custom((value, { req }) => {
    if (!req.files || req.files.length === 0) {
      throw new Error("Product Image is Required");
    }

    if (req.files.length > 4) {
      throw new Error("Maximum of 4 images allowed");
    }

    return true;
  }),

  // PRODUCT NAME
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product Name is Required")
    .isLength({ min: 3 })
    .withMessage("Product Name must be at least 3 characters"),

  // DESCRIPTION
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product Description is Required")
    .isLength({ min: 10 })
    .withMessage("Product Description must be at least 10 characters"),

  // CATEGORY
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Product Category is Required")
    .isIn(["Men", "Women", "Kids"])
    .withMessage("Category must be Men, Women, or Kids"),

  // SUB CATEGORY
  body("subCategory")
    .trim()
    .notEmpty()
    .withMessage("Sub Category is Required")
    .isIn(["Topwear", "Bottomwear", "Footwear", "Accessories"])
    .withMessage(
      "Sub Category must be Topwear, Bottomwear, Footwear, or Accessories",
    ),

  // PRICE
  body("price")
    .notEmpty()
    .withMessage("Product Price is Required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  // STOCK
  body("stock")
    .notEmpty()
    .withMessage("Product Stock is Required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a whole number and cannot be negative"),

  // PRODUCT SIZE
  body("sizes").custom((value) => {
    let parsedSizes;

    try {
      parsedSizes = typeof value === "string" ? JSON.parse(value) : value;
    } catch (error) {
      throw new Error("Invalid product sizes");
    }

    if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
      throw new Error("At least one Product Size is Required");
    }

    const allowedSizes = ["XS", "S", "M", "L", "XL", "XXL"];

    const invalidSize = parsedSizes.find(
      (size) => !allowedSizes.includes(size),
    );

    if (invalidSize) {
      throw new Error(`Invalid Product Size: ${invalidSize}`);
    }

    return true;
  }),
];
