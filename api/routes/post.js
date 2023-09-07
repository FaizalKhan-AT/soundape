const {
  createPost,
  commentPost,
  getAllComments,
} = require("../controllers/post");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/").post(upload.single("file"), createPost);
Router.route("/comment/").post(commentPost);
Router.route("/comment/:id").get(getAllComments);

module.exports = Router;
