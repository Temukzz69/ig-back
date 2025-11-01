import { hash } from "bcrypt";
import { userModel } from "../../schema/user.schema.js";
export const SignUp = async (req, res) => {
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
};
