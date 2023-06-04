const { getProfile } = require("../controllers/user");

const Router = require("express").Router();

Router.route("/:username").get(getProfile);

module.exports = Router;
