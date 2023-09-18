const {
  createPost,
  commentPost,
  getAllComments,
  likeAPost,
  getPostLikes,
  reportPost,
  deletePost,
} = require("../controllers/post");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/").post(upload.single("file"), createPost).delete(deletePost);
Router.route("/comment/").post(commentPost).get(getAllComments);
Router.route("/like/:id").post(likeAPost).get(getPostLikes);
Router.route("/report/:id").post(reportPost);
module.exports = Router;
