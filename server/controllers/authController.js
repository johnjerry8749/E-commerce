import { validationResult } from "express-validator";
import { Registeruser, findUserByEmail } from "../models/User.js";
import { hashPasswod } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await hashPasswod(password);
    const newUser = await Registeruser(name, email, hashedPassword);
    const token = generateToken(newUser.id);

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};
