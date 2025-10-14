import { postsModel } from "../../schema/post.schema";
export const createPosts = async (req, res) => {
  const body = req.body;
  const user = req.user;
  const { caption, images } = body;
  const createdPosts = await postsModel.create({
    user: user._id,
    caption: caption,
    images: images,
  });
  res.status(200).json(createdPosts);
};
