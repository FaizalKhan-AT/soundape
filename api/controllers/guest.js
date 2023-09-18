const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/like");
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
  const userId = req.get("profile-id");
  const loggedId = req.get("logged-in-id");
  let opts = {};
  if (userId) {
    if (userId === loggedId) {
      delete opts.reported;
      opts = { userId };
    } else opts = { reported: false, userId };
  } else opts = { reported: false };
  const posts = await Post.find(opts).select("_id").lean();
  if (posts) {
    return res.status(200).json({ status: "ok", data: posts });
  } else return next(createCustomError("No posts were found :(", 404));
});
// @get return single post
const getSinglePost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const profileId = req.get("profile-id");
  const post = await Post.findOne({ _id: id })
    .populate({
      path: "profile",
      select: "username profileImg _id verified",
    })
    .lean();
  if (post) {
    let liked = false;
    if (profileId !== "") {
      const isLiked = await Like.findOne({ postId: id, profile: profileId });
      if (isLiked) liked = true;
    }
    let profile = post.profile;
    delete post.profile;
    return res
      .status(200)
      .json({ status: "ok", data: { post: { ...post, liked }, profile } });
  } else return next(createCustomError("No post were found :(", 404));
});

module.exports = { getSuggestedCreators, getPostIds, getSinglePost };
