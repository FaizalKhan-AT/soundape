const {
  getProfile,
  updateProfile,
  followUser,
  isFollowedByUser,
} = require("../controllers/user");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/:username").get(getProfile);
Router.route("/:id").patch(upload.single("file"), updateProfile);
Router.route("/follow/:id").post(followUser);
Router.route("/is-followed").get(isFollowedByUser);
module.exports = Router;
