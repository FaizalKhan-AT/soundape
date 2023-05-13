const { createCustomError } = require("../errors/customError");

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (err.code === 11000) {
        return next(createCustomError("Email address already Exists", 403));
      }
      next(err);
    }
  };
};
module.exports = asyncWrapper;
