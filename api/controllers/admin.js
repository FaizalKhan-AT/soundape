const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const Post = require("../models/post");
const Report = require("../models/report");
const User = require("../models/user");

const docCount = async (model, query) => {
  try {
    return await model.countDocuments(query);
  } catch (err) {
    return 0;
  }
};
const FilterData = async (filter) => {
  switch (filter) {
    case "registered-users":
      return await User.find({});
    case "creators":
      return await User.find({ mode: true });
    case "pending-reports":
      return await Report.find({});
    case "reported-posts":
      return await Post.find({ reported: true });
    default:
      return [];
  }
};
const getFilteredData = asyncWrapper(async (req, res, next) => {
  const { filter } = req.params;
  const filteredData = await FilterData(filter);
  if (filteredData.length > 0) {
    return res.status(200).json({ status: "ok", data: filteredData });
  } else return next(createCustomError("Not found :(", 404));
});
module.exports = { getFilteredData };
