import Booking from "../models/booking.model.js";
import Car from "../models/car.model.js";
import mongoose from "mongoose";
// Function to Check the availability of Car for a given date
const isCarAvailable = async (car, pickUpDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickUpDate: { $lte: returnDate },
    returnDate: { $gte: pickUpDate },
  });
  return bookings.length === 0;
};

// api to check car availability for given date and loction

const checkCarAvailability = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    if (!location || !pickupDate || !returnDate) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const cars = await Car.find({ location, isAvailable: true });

    // check if any car is available for the given date range using pormise

    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await isCarAvailable(car._id, pickupDate, returnDate);
      return { ...car._doc, isAvailable: isAvailable };
    });

    let aviailableCars = await Promise.all(availableCarsPromises);
    aviailableCars = aviailableCars.filter((car) => car.isAvailable === true);

    return res.status(200).json({
      success: true,
      message: "Cars available for the given date and location",
      cars: aviailableCars,
    });
  } catch (error) {
    console.log("Error in checkCarAvailability:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api for booking a car
const createBooking = async (req, res) => {
  try {
    const userId = req.userId.id;
    const { car, pickUpDate, returnDate } = req.body;
    if (!car || !pickUpDate || !returnDate) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const isAvailable = await isCarAvailable(car, pickUpDate, returnDate);
    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Car is not available for the selected dates",
      });
    }
    const carData = await Car.findById(car);

    // calcute price based on the number of days
    const pickUp = new Date(pickUpDate);
    const returnDateObj = new Date(returnDate);
    const noOfDays = Math.ceil(returnDateObj - pickUp) / (1000 * 60 * 60 * 24);
    const price = noOfDays * carData.pricePerDay;

    const booking = await Booking.create({
      car,
      owner: carData.owner,
      user: userId,
      pickUpDate,
      returnDate,
      price,
    });
    if (!booking) {
      return res
        .status(500)
        .json({ success: false, message: "Booking failed, please try again" });
    }
    res.status(201).json({
      success: true,
      message: "Car booked successfully",
      booking,
    });
  } catch (error) {
    console.log("Error in bookCar:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api for listing all bookings of a user
const getUserBookings = async (req, res) => {
  try {
    const userId = req.userId.id;
    const bookings = await Booking.find({ user: userId })
      .populate("car")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.log("Error in getUserBookings:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get owner bookings
const getOwnerBookings = async (req, res) => {
  try {
    if (req.userId.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Access denied, only owners can view bookings",
      });
    }
    const ownerId = req.userId.id;
    const bookings = await Booking.find({ owner: ownerId })
      .populate("car user")
      .select("-user.paassword")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Owner bookings fetched successfully",
      bookings,
    });
  } catch (error) {
    console.log("Error in getOwnerBookings:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to change a booking status
const changeBookingStatus = async (req, res) => {
  try {
    const ownerId = req.userId.id;
    const { bookingId, status } = req.body;
    if (!bookingId || !status) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and status are required",
      });
    }
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (!booking.owner.equals(new mongoose.Types.ObjectId(ownerId))) {
      return res
        .status(404)
        .json({ success: false, message: "Not authorized" });
    }
    booking.status = status;
    await booking.save();
    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.log("Error in changeBookingStatus:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  checkCarAvailability,
  createBooking,
  getUserBookings,
  getOwnerBookings,
  changeBookingStatus,
};
