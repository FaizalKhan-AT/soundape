const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const Follower = require("../models/follower");
const Following = require("../models/following");

// get individual profile
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
// update profile function
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
// follower-count updation function
const updateFollowerCount = async (id, profileId) => {
  const followers = await Follower.find({ userId: id });
  const following = await Following.find({ userId: profileId });
  const followedUser = await User.findOne({ _id: id });
  const followingUser = await User.findOne({ _id: profileId });

  followedUser.followerCount = followers.length;
  followingUser.followingCount = following.length;

  followedUser.save();
  followingUser.save();
};
// follow an user
const followUser = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { profileId } = req.body;
  const isFollowed = await Follower.findOne({ userId: id, profile: profileId });
  if (isFollowed) {
    await Follower.findOneAndDelete({ profile: profileId, userId: id });
    await Following.findOneAndDelete({ userId: profileId, userId: profileId });
    updateFollowerCount(id, profileId);
    return res
      .status(200)
      .json({ status: "ok", data: "Unfollowed user succesfully." });
  } else {
    const followed = await Follower.create({ profile: profileId, userId: id });
    const follow = await Following.create({ userId: profileId, profile: id });
    if (followed && follow) {
      updateFollowerCount(id, profileId);
      return res
        .status(200)
        .json({ status: "ok", data: "Followed user succesfully." });
    } else return next(createCustomError("Failed to follow the user...", 404));
  }
});
const isFollowedByUser = asyncWrapper(async (req, res, next) => {
  const userId = req.get("user-id");
  const profile = req.get("profile-id");
  const user = await Following.findOne({
    userId: userId,
    profile: profile,
  });
  if (user) {
    return res.status(200).json({ status: "ok", data: { followed: true } });
  } else return next(createCustomError("User not followed...", 404));
});
const getFollowers = asyncWrapper(async (req, res, next) => {
  const userId = req.params.id;
  const followers = await Follower.find({ userId }).populate({
    path: "profile",
    select: "_id username verified profileImg displayname",
  });
  if (followers.length > 0) {
    return res.status(200).json({ status: "ok", data: followers });
  } else return next(createCustomError("No followers till now...", 404));
});
const getFollowing = asyncWrapper(async (req, res, next) => {
  const userId = req.params.id;
  const following = await Following.find({ userId }).populate({
    path: "profile",
    select: "_id username verified profileImg displayname",
  });
  if (following.length > 0) {
    return res.status(200).json({ status: "ok", data: following });
  } else return next(createCustomError("No following till now...", 404));
});
const getUsers = asyncWrapper(async (req, res, next) => {
  const users = await User.find({});
  if (users.length > 0) {
    return res.status(200).json({ status: "ok", data: users });
  } else return next(createCustomError("No users were found..", 404));
});
module.exports = {
  getProfile,
  updateProfile,
  followUser,
  isFollowedByUser,
  getFollowers,
  getFollowing,
  getUsers,
};
