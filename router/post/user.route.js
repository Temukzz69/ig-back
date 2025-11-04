import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { login } from "../../controller/user/login.js";
import router from "./post.route.js";

const UserRouter = express.Router;

router.post("/login", authMiddleware, login);
router.post("/SignUp", authMiddleware, SignUp);

export default UserRouter;
