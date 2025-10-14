import express from "express";
import mongoose from "mongoose";
import { userModel } from "./schema/schema.js";
import { postsModel } from "./schema/post.schema.js";
import { hash, compare } from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const ConnectToDB = async () => {
  await mongoose.connect(
    "mongodb+srv://temuky2_db_user:tenuun1234@cluster0.vsdz24u.mongodb.net/"
  );
};
ConnectToDB();

app.post("/user", async (req, res) => {
  const body = req.body;
  const { userName, email, password } = body;
  const saltRound = 10;
  const Exists = await userModel.findOne({ email });
  const HashedPassword = await hash(password, saltRound);
  if (Exists) {
    res.status(404).json({ message: "account already exists" });
  } else {
    const SignUp = await userModel.create({
      userName: userName,
      email: email,
      password: HashedPassword,
    });
    res.json(SignUp);
  }
});

app.post("/login", async (req, res) => {
  const body = req.body;
  const JWT_SECRET = "secret";
  const { email, password } = body;
  const user = await userModel.findOne({ email });
  if (user) {
    const HashedPassword = user.password;
    const IsValid = await compare(password, HashedPassword);
    if (IsValid) {
      const accessToken = jwt.sign(
        {
          data: user,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json(accessToken);
    } else {
      res.status(404).json({ message: "wrong password" });
    }
  } else {
    res.status(404).json({ message: "need to register" });
  }
});
app.post("/createPosts", async (req, res) => {
  console.log(req.user);
  const body = req.body;
  const user = req.user;
  const { caption, image } = body;
  const createdPosts = await postsModel.create({
    user: user._id,
    caption: caption,
    image: image,
  });
  res.status(200).json(createdPosts);
});
app.listen(PORT, () => {
  console.log(`your server is running on http://localhost:${PORT}`);
});
