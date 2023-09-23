const { getMetrics } = require("../controllers/admin");

const Router = require("express").Router();

Router.route("/").get(getMetrics);

module.exports = Router;
