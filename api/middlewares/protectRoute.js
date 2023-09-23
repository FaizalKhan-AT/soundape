const jwt = require("jsonwebtoken");
const admin = require("../models/admin");
const user = require("../models/user");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      let decode = jwt.verify(token, process.env.JWT_SECRET);
      if (req.url.includes("/admin"))
        req.admin = await admin.findById(decode.id).select("-password");
      else req.user = await user.findById(decode.id).select("-password");
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ status: "error", error: "Not Authorized / invalid token" });
    }
  }
  if (!token)
    return res.status(401).json({ status: "error", error: "No token present" });
};
module.exports = { protect };
