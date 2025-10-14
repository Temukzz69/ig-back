import express from " express";
import { getPosts } from "../../controller/post/get-posts";
import { createPosts } from "../../controller/post/create-post";
import { authMiddleware } from "../../../ig-frontend/src/app/middleware/auth-middleware";
const postRouter = express.Router();
postRouter.get("/", authMiddleware, getPosts);
postRouter.post("/", authMiddleware, createPosts);
export default postRouter;
