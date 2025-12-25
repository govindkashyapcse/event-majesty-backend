// models/User.js
import mongoose from "../config/db.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // null for google users
  googleId: String,
  provider: { type: String, enum: ["email", "google"], default: "google" },
  role: { type: String, enum: ["admin", "user"], default: "user" }
}, { timestamps: true });

const User = mongoose.model("User",userSchema);

export default User;