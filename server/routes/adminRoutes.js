import { Router } from "express";
import { adminLogin } from "../controllers/authController.js";

const router = Router();

// ========================================
// ADMIN LOGIN
// ========================================
router.post("/login", adminLogin);

// Future admin routes:
// router.post("/users", adminOnly, createUser);
// router.get("/users", adminOnly, getAllUsers);
// router.put("/users/:id", adminOnly, updateUser);
// router.delete("/users/:id", adminOnly, deleteUser);

export default router;
