import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { postsModel } from "../../schema/post.schema.js";
import { createPosts } from "../../controller/post/create-post.js";
import { getPosts } from "../../controller/post/get-posts.js";
const router = express.Router();

router.get("/getPosts", async (_req, res) => {
  try {
    const posts = await postsModel.find().populate("user", "userName email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/createPosts", authMiddleware, createPosts);
router.get("/getPosts", authMiddleware, getPosts);
export default router;
