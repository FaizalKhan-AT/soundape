const {
  login,
  register,
  getUser,
  createAdmin,
  adminLogin,
  getAdmin
} = require("../controllers/auth");
const { protect } = require("../middlewares/protectRoute");
const Router = require("express").Router();

Router.route("/").get(protect, getUser);
Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/admin").get(protect, getAdmin).post(createAdmin);
Router.route("/admin/login").post(adminLogin);

module.exports = Router;
