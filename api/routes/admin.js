const { getFilteredData } = require("../controllers/admin");

const Router = require("express").Router();

Router.route("/:filter").get(getFilteredData);

module.exports = Router;
