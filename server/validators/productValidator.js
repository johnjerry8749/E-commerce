import { body } from "express-validator";

export const productValidator = [
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
  body("subcategory")
    .trim()
    .notEmpty()
    .withMessage("Sub Category is Required")
    .isIn(["Topwear", "Bottomwear", "Footwear"])
    .withMessage("Sub Category must be Topwear, Bottomwear, or Footwear"),

  // PRICE
  body("price")
    .notEmpty()
    .withMessage("Product Price is Required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  // SIZES (JSON string of array)
  body("size")
    .notEmpty()
    .withMessage("At least one size is required")
    .custom((value) => {
      try {
        const sizes = JSON.parse(value);
        if (!Array.isArray(sizes) || sizes.length === 0) {
          throw new Error("At least one size is required");
        }
        const allowed = ["S", "M", "L", "XL", "XXL"];
        const invalid = sizes.some((s) => !allowed.includes(s));
        if (invalid) {
          throw new Error("Invalid size selected");
        }
        return true;
      } catch (err) {
        throw new Error(err.message || "Invalid size format");
      }
    }),
];