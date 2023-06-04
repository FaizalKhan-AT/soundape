const { createPost } = require("../controllers/post");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/").post(upload.single("file"), createPost);

module.exports = Router;
