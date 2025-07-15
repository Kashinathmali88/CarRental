import express from "express";
import {
  addCar,
  changeRoleToOwner,
  getOwnerCars,
  toggleCarAvailability,
  deleteCar,
  getDashboardData,
  updateUserImage,
} from "../controllers/owner.controller.js";
import { protect } from "../middleware/user.middleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/change-role", protect, changeRoleToOwner);
router.post("/add-car", protect, upload.single("image"), addCar);
router.get("/get-cars", protect, getOwnerCars);
router.post("/toggle-car", protect, toggleCarAvailability);
router.post("/delete-car", protect, deleteCar);
router.get("/dashboard", protect, getDashboardData);
router.post("/update-image", protect, upload.single("image"), updateUserImage);

export default router;
