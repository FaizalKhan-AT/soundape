const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const User = require("../models/user");
const Post = require("../models/post");
// @get suggested creators
const getSuggestedCreators = asyncWrapper(async (req, res, next) => {
  const creators = await User.find({ mode: true })
    .select("-password")
    .limit(6)
    .lean();
  if (creators) {
    return res.status(200).json({ status: "ok", data: creators });
  } else return next(createCustomError("No creators were found :(", 404));
});
// @get return ids of posts
const getPostIds = asyncWrapper(async (req, res, next) => {
  const posts = await Post.find().select("_id").lean();
  if (posts) {
    return res.status(200).json({ status: "ok", data: posts });
  } else return next(createCustomError("No posts were found :(", 404));
});
// @get return single post
const getSinglePost = asyncWrapper(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id }).lean();
  if (post) {
    const creator = await User.findOne({ _id: post.userId }).lean();
    if (creator)
      return res
        .status(200)
        .json({ status: "ok", data: { post, profile: creator } });
    else
      return next(createCustomError("Post exists but user not found :(", 404));
  } else return next(createCustomError("No post were found :(", 404));
});

module.exports = { getSuggestedCreators, getPostIds, getSinglePost };
