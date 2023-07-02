const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const Post = require("../models/post");
const User = require("../models/user");

const createPost = asyncWrapper(async (req, res, next) => {
  const uid = req.body.userId;
  const response = await Post.create({
    ...req.body,
    audioUrl: req.file.filename,
  });
  if (response) {
    const posts = await Post.find({ userId: uid });
    const creator = await User.findOne({ _id: uid });
    if (creator && posts.length > 0) {
      creator.postCount = posts.length;
      creator.save();
      return res
        .status(200)
        .json({ status: "ok", data: "Post created successfully" });
    } else
      return next(
        createCustomError("something went wrong while posting...", 409)
      );
  } else
    return next(
      createCustomError("something went wrong while posting...", 409)
    );
});

module.exports = {
  createPost,
};
