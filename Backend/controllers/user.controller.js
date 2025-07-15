import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/car.model.js";

// Generate JWT token function
const generateAuthToken = (userId, role) => {
  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "1h",
  });
};

// register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(`Error in registerUser: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    // Generate a JWT token
    const token = generateAuthToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log(`Error in loginUser: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId.id;
    // Find the user by ID
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(`Error in getUserProfile: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

const isLoggedIn = async (req, res) => {
  res.status(200).json({ success: true, message: "User is logged in" });
};

const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    });
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully  " });
  } catch (error) {
    console.log(`Error in logOut: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    return res.status(200).json({ success: true, cars });
  } catch (error) {
    console.log(`Error in getCars: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getUserProfile, isLoggedIn, logOut, getCars };
