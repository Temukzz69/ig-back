import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { userModel } from "./schema/schema.js";
import postRouter from "./router/post/post.route.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

const ConnectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://temuky2_db_user:tenuun1234@cluster0.vsdz24u.mongodb.net/"
    );
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};
ConnectToDB();

app.post("/user", async (req, res) => {
  const { userName, email, password } = req.body;
  const saltRound = 10;

  const Exists = await userModel.findOne({ email });
  if (Exists)
    return res.status(404).json({ message: "account already exists" });

  const HashedPassword = await hash(password, saltRound);
  const SignUp = await userModel.create({
    userName,
    email,
    password: HashedPassword,
  });

  res.status(201).json(SignUp);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const JWT_SECRET = "nuuts shu!";

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "need to register" });

  const IsValid = await compare(password, user.password);
  if (!IsValid) return res.status(404).json({ message: "wrong password" });

  const accessToken = jwt.sign({ data: user._id }, JWT_SECRET, {
    expiresIn: "200000000h",
  });
  res.json({ token: accessToken });
});

app.use(postRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
