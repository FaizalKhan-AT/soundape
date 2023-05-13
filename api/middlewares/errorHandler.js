const { CustomAPIError } = require("../errors/customError");
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ status: "error", error: err.message });
  }
  return res
    .status(500)
    .json({ status: "error", error: "Something went wrong, please try again" });
};

module.exports = errorHandler;
