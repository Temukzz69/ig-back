import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  image: { type: [String], required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const postsModel = mongoose.model("posts", postSchema);
