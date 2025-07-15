import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "owner"], default: "user" },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/djwd3vmma/image/upload/v1752124589/Profile-Image.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
