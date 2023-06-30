const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");

const getProfile = asyncWrapper(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username })
    .select("-password")
    .lean();
  if (user) {
    return res.status(200).json({ status: "ok", data: user });
  } else return next(createCustomError("Profile doesn't exist...", 404));
});
const handleFileDelete = (fp) => {
  let filename = path.join(__dirname, "..", fp);
  let tempFile = fs.openSync(filename, "r");
  fs.closeSync(tempFile);

  fs.unlinkSync(filename);
};
const updateProfile = asyncWrapper(async (req, res, next) => {
  let data = req.body;
  const file = req.file;
  const _id = req.params.id;
  if (file) {
    if (data.profileImg !== "default.jpg")
      handleFileDelete("uploads//" + data.profileImg);
    data = { ...data, profileImg: file.filename };
  }
  const upProfile = await User.findOneAndUpdate({ _id }, data, {
    new: true,
    runValidators: true,
  });
  if (upProfile) {
    return res
      .status(200)
      .json({ status: "ok", data: "Profile updated successfully" });
  } else
    return next(
      createCustomError(
        "Profile updation unsuccessfull... pls try again later..",
        404
      )
    );
});

module.exports = {
  getProfile,
  updateProfile,
};
