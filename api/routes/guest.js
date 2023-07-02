const {
  getSuggestedCreators,
  getPostIds,
  getSinglePost,
} = require("../controllers/guest");

const Router = require("express").Router();

Router.route("/suggested").get(getSuggestedCreators);
Router.route("/").get(getPostIds);
Router.route("/post/:id").get(getSinglePost);

module.exports = Router;
