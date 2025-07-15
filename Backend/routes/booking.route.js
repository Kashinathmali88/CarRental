import express from "express";
import {
  changeBookingStatus,
  checkCarAvailability,
  createBooking,
  getOwnerBookings,
  getUserBookings,
} from "../controllers/booking.controller.js";
import { protect } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/check-availability", checkCarAvailability);
router.post("/create", protect, createBooking);
router.get("/user", protect, getUserBookings);
router.get("/owner", protect, getOwnerBookings);
router.post("/change-status", protect, changeBookingStatus);

export default router;
