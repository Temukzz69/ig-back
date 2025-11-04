import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";

import { createPosts } from "../../controller/post/create-post.js";
import { getPosts } from "../../controller/post/get-posts.js";
const router = express.Router();

router.post("/createPosts", authMiddleware, createPosts);
router.get("/getPosts", authMiddleware, getPosts);
export default router;
