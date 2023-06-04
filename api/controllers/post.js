const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const post = require("../models/post");

const createPost = asyncWrapper(async (req, res, next) => {
  const response = await post.create({ ...req.body, audioUrl: req.file.path });
  if (response) {
    return res
      .status(200)
      .json({ status: "ok", data: "Post created successfully" });
  } else
    return next(
      createCustomError("something went wrong while posting...", 409)
    );
});

module.exports = {
  createPost,
};
