import express from "express";
import { authMiddleware } from "../../middleware/auth-middleware.js";
import { login } from "../../controller/user/login.js";
import router from "./post.route.js";

const UserRouter = express.Router;

router.post("/login", login);
router.post("/signup", SignUp);

export default UserRouter;
