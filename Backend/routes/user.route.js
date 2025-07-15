import express from "express";
import {
  getCars,
  getUserProfile,
  isLoggedIn,
  loginUser,
  logOut,
  registerUser,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/cars", getCars);

// protect routes with middleware
router.get("/profile", protect, getUserProfile);
router.get("/isLoggedIn", protect, isLoggedIn);
router.get("/logout", protect, logOut);

export default router;
