import { postsModel } from "../../schema/post.schema";
export const getPosts = async (_req, res) => {
  const posts = await postsModel.find().populate("user");
  res.status(200).json(posts);
};
