const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const Like = require("../models/like");
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
  const comments = await Comment.find({ postId: req.get("post-id") }).populate({
    path: "profile",
    select: "_id username verified profileImg",
  });
  if (comments.length > 0) {
    return res.status(200).json({ status: "ok", data: comments });
  } else
    return next(createCustomError("No comments were posted till now..", 404));
});
const likeAPost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { profileId } = req.body;
  const isLiked = await Like.findOne({ profile: profileId });
  const likes = await Like.find({ postId: id });
  const post = await Post.findOne({ _id: id });
  if (isLiked) {
    await Like.findOneAndDelete({ _id: isLiked._id });
    post.likes = likes.length - 1;
    post.save();
    return res
      .status(200)
      .json({ status: "ok", data: "Disliked the post successfully.." });
  } else {
    const newLike = await Like.create({
      postId: id,
      profile: profileId,
    });
    if (newLike) {
      post.likes = likes.length + 1;
      post.save();
      return res
        .status(200)
        .json({ status: "ok", data: "Liked the post successfully.." });
    } else return next(createCustomError("Failed to like the post :(..", 404));
  }
});
const getPostLikes = asyncWrapper(async (req, res, next) => {
  const likes = await Like.find({ postId: req.params.id }).populate({
    path: "profile",
    select: "_id username verified profileImg displayname",
  });
  if (likes.length > 0)
    return res.status(200).json({ status: "ok", data: likes });
  else return next(createCustomError("No likes till now..", 404));
});

module.exports = {
  createPost,
  commentPost,
  getAllComments,
  likeAPost,
  getPostLikes,
};
