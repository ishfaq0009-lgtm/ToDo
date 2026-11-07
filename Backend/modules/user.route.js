import { Router } from "express";
import {
  register,
  login,
  logout,
  getMe,
  getAllUsers,
  checkAdminExists, // ✅ import
} from "./user.controller.js";
import { protect, adminOnly } from "../shared/middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.get("/all", protect, adminOnly, getAllUsers);
router.get("/admin-exists", checkAdminExists); // ✅ public route

export default router;