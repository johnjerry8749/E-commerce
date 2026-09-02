import { body } from "express-validator";

export const productValidator = [

  // PRODUCT IMAGE
  body("Uploaded Image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Product Image is Required");
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
    .isIn(["TopWear", "BottomWear", "FootWear", "Accessories"])
    .withMessage(
      "Sub Category must be TopWear, BottomWear, FootWear, or Accessories"
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
  body("productSize")
    .trim()
    .notEmpty()
    .withMessage("Product Size is Required")
    .isIn(["XS", "S", "M", "L", "XL"])
    .withMessage("Product Size must be XS, S, M, L, or XL"),
];