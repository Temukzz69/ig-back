import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import jwt from "jsonwebtoken";

import postRouter from "./router/post/post.route.js";
import UserRouter from "./router/post/user.route.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const ConnectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://temuky2_db_user:tenuun1234@cluster0.vsdz24u.mongodb.net/"
    );
    console.log(" MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection failed:", err.message);
  }
};
ConnectToDB();

app.use("/user", UserRouter);

app.use(postRouter);

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
