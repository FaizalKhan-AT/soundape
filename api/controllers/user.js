const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const User = require("../models/user");

const getProfile = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username })
    .select("-password")
    .lean();
  if (user) {
    return res.status(200).json({ status: "ok", data: user });
  } else return next(createCustomError("Profile doesn't exist...", 404));
});

module.exports = {
  getProfile,
};
