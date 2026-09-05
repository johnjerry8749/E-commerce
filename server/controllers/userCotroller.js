
import {
  getUserByid,
  getAllUsers as getAllUsersModel,
} from "../models/User.js";

// ===========================
// GET ACTIVE USER (PROFILE)
// ===========================
export const getMe = async (req, res) => {
  try {
    const user = await getUserByid(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No User Found!!",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Me Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ===========================
// GET USER BY ID (ADMIN)
// ===========================
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserByid(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// ===========================
// GET ALL USERS (ADMIN)
// ===========================
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersModel();

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get users",
      error: error.message,
    });
  }
};

