import { body } from "express-validator";


export const registerValidator = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is Required")
    .isLength({min: 3})
    .withMessage("Name must be at least 3 characters"),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is Required")
    .isLength({min: 3})
    .withMessage("Email must be a Valid Email"),

     body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({min: 3})
    .withMessage(" must be at least 4 characters")
]

export const ProductValidator = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Product Name is Required")
    .isLength({min: 3})
    .withMessage("Product Name must be at least 3 characters"),
    body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number")
];