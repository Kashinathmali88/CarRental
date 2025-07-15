import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();
// Import routes
import userRoutes from "./routes/user.route.js";
import ownerRoutes from "./routes/owner.route.js";
import bookingRoutes from "./routes/booking.route.js";

// Initlialize the app
const app = express();
const PORT = process.env.PORT || 4000;
// Database connection
connectDB();
// Cloudinary connection
connectCloudinary();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.ORIGIN]
        : ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/bookings", bookingRoutes);
app.get("/", (req, res) => {
  return res.send("Welcome to the backend server!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
