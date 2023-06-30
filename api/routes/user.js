const { getProfile, updateProfile } = require("../controllers/user");
const upload = require("../middlewares/FileUpload");

const Router = require("express").Router();

Router.route("/:username").get(getProfile);
Router.route("/:id").patch(upload.single("file"), updateProfile);

module.exports = Router;
