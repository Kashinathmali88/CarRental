import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import { v2 as cloudinary } from "cloudinary";
import Booking from "../models/booking.model.js";
// Function to change user role to owner
const changeRoleToOwner = async (req, res) => {
  try {
    const userId = req.userId.id;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { role: "owner" },
      { new: true }
    ).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User role changed to owner successfully",
      user,
    });
  } catch (error) {
    console.error(`Error in changeRoleToOwner: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to add a car
const addCar = async (req, res) => {
  try {
    let data = JSON.parse(req.body.carData);
    const image = req.file;
    const ownerId = req.userId.id;

    let imageUploaded = await cloudinary.uploader.upload(image.path, {
      folder: "car-rental/cars",
    });

    const imageUrl = imageUploaded.secure_url;

    const newCar = {
      ...data,
      owner: ownerId,
      image: imageUrl,
    };
    await Car.create(newCar);
    res.status(201).json({
      success: true,
      message: "Car added successfully",
    });
  } catch (error) {
    console.error(`Error in addCar: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get all cars of owner
const getOwnerCars = async (req, res) => {
  try {
    const ownerId = req.userId.id;
    const cars = await Car.find({ owner: ownerId }).populate(
      "owner",
      "name email"
    );

    if (!cars || cars.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No cars found for this owner" });
    }

    res.status(200).json({
      success: true,
      cars,
    });
  } catch (error) {
    console.error(`Error in getOwnerCars: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api for toggleting car availability
const toggleCarAvailability = async (req, res) => {
  try {
    const { carId } = req.body;
    const ownerId = req.userId.id;

    // Find the car by ID and owner
    const car = await Car.findOne({ _id: carId, owner: ownerId });
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found or you do not have permission to modify it",
      });
    }
    // Toggle the availability status
    car.isAvailable = !car.isAvailable;
    await car.save();
    res.status(200).json({
      success: true,
      message: `Car availability toggled to ${
        car.isAvailable ? "available" : "not available"
      }`,
      car,
    });
  } catch (error) {
    console.error(`Error in toggleCarAvailability: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api for delteing car
const deleteCar = async (req, res) => {
  try {
    const { carId } = req.body;
    const ownerId = req.userId.id;

    // Find the car by ID and owner
    const car = await Car.findById({ _id: carId, owner: ownerId });
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found or you do not have permission to delete it",
      });
    }
    car.owner = null;
    car.isAvailable = false;
    car.save();
    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error(`Error in deleteCar: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get dashbord data
const getDashboardData = async (req, res) => {
  try {
    const ownerId = req.userId.id;
    const owner = await User.findById(ownerId).select("name email role");
    if (owner.role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this data",
      });
    }
    const cars = await Car.find({ owner: ownerId });
    const bookings = await Booking.find({ owner: ownerId })
      .populate("car")
      .sort({ createdAt: -1 });

    const pendingsBookings = await Booking.find({
      owner: ownerId,
      status: "pending",
    });
    const completeBookings = await Booking.find({
      owner: ownerId,
      status: "completed",
    });

    // caluclate monthly income
    const monthlyRevenue = bookings
      .slice()
      .filter((booking) => booking.status === "completed")
      .reduce((acc, booking) => acc + booking.price, 0);

    const dashboardData = {
      totalCars: cars.length,
      totalBookings: bookings.length,
      totalPendingBookings: pendingsBookings.length,
      totalCompleteBookings: completeBookings.length,
      recentBookings: bookings.slice(0, 3),
      monthlyRevenue,
    };

    res.status(200).json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    console.error(`Error in getDashboardData: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to user image
const updateUserImage = async (req, res) => {
  try {
    const userId = req.userId.id;
    const image = req.file;

    let imageUploaded = await cloudinary.uploader.upload(image.path, {
      folder: "car-rental/cars",
    });

    const imageUrl = imageUploaded.secure_url;
    const user = await User.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User image updated successfully",
      user,
    });
  } catch (error) {
    console.error(`Error in updataing user image: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  changeRoleToOwner,
  addCar,
  getOwnerCars,
  toggleCarAvailability,
  deleteCar,
  getDashboardData,
  updateUserImage,
};
