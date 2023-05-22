const { createCustomError } = require("../errors/customError");

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      if (err.code === 11000) {
        console.log(err);
        return next(
          createCustomError(
            `${
              err.keyPattern.username ? "Username" : "Email address"
            } already Exists`,
            403
          )
        );
      }
      next(err);
    }
  };
};
module.exports = asyncWrapper;
