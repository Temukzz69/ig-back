import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { postsModel } from "../../schema/post.schema.js";

const router = express.Router();

router.get("/getPosts", async (_req, res) => {
  try {
    const posts = await postsModel.find().populate("user", "userName email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/createPosts", authMiddleware, async (req, res) => {
  const { caption, image } = req.body;
  const user = req.user;

  try {
    const createdPost = await postsModel.create({ user, caption, image });
    res.status(201).json(createdPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
