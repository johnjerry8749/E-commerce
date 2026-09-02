import { Router } from "express";
import { registerValidator } from "../validators/authValidator.js";  // ← Add this

import { register, login, adminLogin } from "../controllers/authController.js";


const router = Router();

router.post("/register",registerValidator, register);
router.post("/login", login);
router.post("/admin-login", adminLogin);  // ← ADMIN LOGIN



export default router;