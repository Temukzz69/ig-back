import { compare } from "bcrypt";
import { userModel } from "../../schema/schema.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const JWT_SECRET = "nuuts shu!";

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: "need to register" });

  const IsValid = await compare(password, user.password);
  if (!IsValid) return res.status(404).json({ message: "wrong password" });

  const accessToken = jwt.sign({ data: user._id }, JWT_SECRET, {
    expiresIn: "20h",
  });
  res.json({ token: accessToken });
};
