import mongoose from "mongoose";
import Schema from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  bio: { type: String, required: false },
  profilePic: { type: String, required: false },
  followers: [{ type: Schema.Types.ObjectId, required: true }],
  followings: [{ type: Schema.Types.ObjectId, required: true }],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
export const userModel = mongoose.model("user", userSchema);
