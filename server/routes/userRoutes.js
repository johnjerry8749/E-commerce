import { Router } from "express";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

import { sendNewsletterToSubscribers } from "../services/emailServices.js";

import {
  getMe,
  getUserById,
  getAllUsers,
} from "../controllers/userCotroller.js";

const router = Router();

// ======================
// GET ACTIVE LOGGED-IN USER
// ======================
router.get("/me", protect, getMe);

// ======================
// GET ANY USER - ADMIN ONLY
// ======================
router.get("/me/:id", protect, adminOnly, getUserById);

// ======================
// GET ALL USERS - ADMIN ONLY
// ======================
router.get("/", protect, adminOnly, getAllUsers);

// ======================
// SEND NEWSLETTER - ADMIN ONLY
// ======================
router.post("/newsletter", protect, adminOnly, sendNewsletterToSubscribers);

export default router;
