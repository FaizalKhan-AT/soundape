const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const Post = require("../models/post");
const Report = require("../models/report");
const User = require("../models/user");

const docCount = async (model, query) => {
  try {
    return await model.countDocuments(query);
  } catch (err) {
    return 0;
  }
};

const FilterData = async (filter) => {
  switch (filter) {
    case "registered-users":
      return await User.find({});
    case "creators":
      return await User.find({ mode: true });
    case "pending-reports":
      return await Report.find({});
    case "reported-posts":
      return await Post.find({ reported: true });
    default:
      return [];
  }
};

const getFilteredData = asyncWrapper(async (req, res, next) => {
  const { filter } = req.params;
  const filteredData = await FilterData(filter);
  if (filteredData.length > 0) {
    return res.status(200).json({ status: "ok", data: filteredData });
  } else return next(createCustomError("Not found :(", 404));
});

const verifyUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (user) {
    user.verified = true;
    user.save();
    return res.status(200).json({ status: "ok", data: "user verified.." });
  } else return next(createCustomError("User not found :(", 404));
});

const refuteUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (user) {
    user.verified = false;
    user.save();
    return res.status(200).json({ status: "ok", data: "user refuted.." });
  } else return next(createCustomError("User not found :(", 404));
});
const reportPost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  if (post) {
    post.reported = true;
    post.save();
    await Report.findOneAndDelete({ postId: id });
    return res.status(200).json({ status: "ok", data: "post reported.." });
  } else return next(createCustomError("Post not found :(", 404));
});
const revokeReportedPost = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });
  if (post) {
    post.reported = false;
    post.save();
    return res.status(200).json({ status: "ok", data: "post reported.." });
  } else return next(createCustomError("Post not found :(", 404));
});
const deleteUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOneAndDelete({ _id: id });
  if (user) {
    const posts = await Post.deleteMany({ userId: id });
    if (posts)
      return res
        .status(200)
        .json({ status: "ok", data: "user and posts deleted.." });
    else return next(createCustomError("Posts weren't found", 404));
  } else return next(createCustomError("User not found :(", 404));
});

module.exports = {
  getFilteredData,
  verifyUser,
  refuteUser,
  deleteUser,
  reportPost,
  revokeReportedPost,
};
