const {
  getProfile,
  updateProfile,
  followUser,
  isFollowedByUser,
  getFollowing,
  getFollowers,
  getUsers,
} = require("../controllers/user");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/is-followed").get(isFollowedByUser);
Router.route("/:username").get(getProfile);
Router.route("/:id").patch(upload.single("file"), updateProfile);
Router.route("/follow/:id").post(followUser);
Router.route("/following/:id").get(getFollowing);
Router.route("/followers/:id").get(getFollowers);
Router.route("/").get(getUsers);
module.exports = Router;
