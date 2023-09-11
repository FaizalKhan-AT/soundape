const {
  createPost,
  commentPost,
  getAllComments,
  likeAPost,
  getPostLikes,
} = require("../controllers/post");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/").post(upload.single("file"), createPost);
Router.route("/comment/").post(commentPost).get(getAllComments);
Router.route("/like/:id").post(likeAPost).get(getPostLikes);
module.exports = Router;
