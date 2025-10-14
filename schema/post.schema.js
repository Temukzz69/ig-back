import mongoose from "mongoose";
import Schema from "mongoose";
const postModel = new mongoose.Schema({
  caption: { type: String, required: true },
  image: { type: [{ type: String, required: true }], required: true },
  likes: [{ type: Schema.Types.ObjectId, required: true }],
  user: [{ type: Schema.Types.ObjectId, required: true }],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
export const postsModel = mongoose.model("posts", postModel);
