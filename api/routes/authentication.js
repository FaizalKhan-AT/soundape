const { login, register, getUser } = require("../controllers/auth");
const { protect } = require("../middlewares/protectRoute");
const Router = require("express").Router();

Router.route("/").get(protect, getUser);
Router.route("/register").post(register);
Router.route("/login").post(login);

module.exports = Router;
