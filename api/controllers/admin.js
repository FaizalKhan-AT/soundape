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

const getMetrics = asyncWrapper(async (req, res, next) => {
  const dashboard = [
    {
      name: "Registered Users",
      icon: "group",
      count: await docCount(User, {}),
    },
    {
      name: "Creators",
      icon: "person",
      count: await docCount(User, { mode: true }),
    },
    {
      name: "Posts",
      icon: "apps",
      count: await docCount(Post, { reported: false }),
    },
    {
      name: "Reported Posts",
      icon: "report",
      count: await docCount(Post, { reported: true }),
    },
    {
      name: "Pending posts to report",
      icon: "pending_actions",
      count: await docCount(Report, {}),
    },
  ];
  if (dashboard.length > 0) {
    return res.status(200).json({ status: "ok", data: dashboard });
  } else return next(createCustomError("Not found :(", 404));
});
module.exports = { getMetrics };
