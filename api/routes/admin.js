const {
  getFilteredData,
  verifyUser,
  refuteUser,
  deleteUser,
  reportPost,
  revokeReportedPost,
} = require("../controllers/admin");

const Router = require("express").Router();

Router.route("/:filter").get(getFilteredData);
Router.route("/verify/:id").patch(verifyUser);
Router.route("/refute/:id").patch(refuteUser);
Router.route("/report-post/:id").patch(reportPost);
Router.route("/revoke-post/:id").patch(revokeReportedPost);
Router.route("/delete-user/:id").delete(deleteUser);

module.exports = Router;
