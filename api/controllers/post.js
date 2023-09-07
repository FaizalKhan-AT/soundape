const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const createPost = asyncWrapper(async (req, res, next) => {
  const uid = req.body.userId;
  const response = await Post.create({
    ...req.body,
    audioUrl: req.file.filename,
    profile: uid,
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
const commentPost = asyncWrapper(async (req, res, next) => {
  const response = await Comment.create({ ...req.body });
  if (response) {
    return res
      .status(200)
      .json({ status: "ok", data: "Your comment was added" });
  } else
    return next(
      createCustomError(
        "something went wrong while posting the comment...",
        409
      )
    );
});
const getAllComments = asyncWrapper(async (req, res, next) => {
  const comments = await Comment.find({ postId: req.params.id }).populate({
    path: "profile",
    select: "_id username verified profileImg",
  });
  if (comments.length > 0) {
    return res.status(200).json({ status: "ok", data: comments });
  } else
    return next(createCustomError("No comments were posted till now..", 404));
});
module.exports = {
  createPost,
  commentPost,
  getAllComments,
};
