const { createCustomError } = require("../errors/customError");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin");

const register = asyncWrapper(async (req, res, next) => {
  const { username, password, email, displayname } = req.body;
  const pas = await bcrypt.hash(password, 10);

  const response = await user.create({
    password: pas,
    username,
    email,
    displayname,
  });

  if (response)
    return res
      .status(200)
      .json({ status: "ok", data: "user created successfully" });
  else
    return next(
      createCustomError("something went wrong while creating user", 409)
    );
});
const generateToken = (person) => {
  return jwt.sign(
    {
      id: person._id,
      email: person.email,
      username: person.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );
};
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const person = await user.findOne({ email }).lean();
  if (!person) return next(createCustomError("user not found", 404));
  if (await bcrypt.compare(password, person.password)) {
    const token = generateToken(person);
    return res.status(200).json({
      status: "ok",
      data: {
        username: person.username,
        token,
        email: person.email,
        id: person._id,
      },
    });
  }
  return next(createCustomError("Invalid email / password", 400));
});
const getUser = asyncWrapper(async (req, res, next) => {
  if (!req.user)
    return next(createCustomError("User not found or doesn't exist", 404));

  return res.status(200).json({ status: "ok", data: req.user });
});
const getAdmin = asyncWrapper(async (req, res, next) => {
  if (!req.admin)
    return next(createCustomError("Admin not found or doesn't exist", 404));

  return res.status(200).json({ status: "ok", data: req.admin });
});
const createAdmin = asyncWrapper(async (req, res, next) => {
  const { username, password, email } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const newAdmin = await admin.create({
    password: hashPassword,
    username,
    email,
  });

  if (newAdmin)
    return res
      .status(200)
      .json({ status: "ok", data: "admin created successfully" });
  else
    return next(
      createCustomError("something went wrong while creating admin", 409)
    );
});

const adminLogin = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const person = await admin.findOne({ email }).lean();
  if (!person) return next(createCustomError("admin not found", 404));
  if (await bcrypt.compare(password, person.password)) {
    const token = generateToken(person);
    return res.status(200).json({
      status: "ok",
      data: {
        username: person.username,
        token,
        email: person.email,
        _id: person._id,
      },
    });
  }
  return next(createCustomError("Invalid email / password", 400));
});
const checkEmail = asyncWrapper(async (req, res, next) => {
  const email = req.get("email");
  const person = await user.findOne({ email }).lean();
  if (!person) return next(createCustomError("user not found", 404));

  return res.status(200).json({
    status: "ok",
    data: "valid email address",
  });
});
const changePassword = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  const person = await user.findOneAndUpdate(
    { email },
    { password: hashPassword }
  );
  if (person)
    return res.status(200).json({
      status: "ok",
      data: "Password successfully changed.",
    });
  else return next(createCustomError("Password change unsuccessfull", 404));
});
module.exports = {
  register,
  login,
  getUser,
  createAdmin,
  adminLogin,
  getAdmin,
  checkEmail,
  changePassword,
};
