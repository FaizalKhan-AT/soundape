const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mode: { type: Boolean, required: true, default: false },
  profileImg: {
    type: String,
    required: true,
    default: "default.jpg",
  },
  profileDesc: {
    type: String,
  },
  postCount: {
    type: Number,
    default: 0,
  },
  followerCount: {
    type: Number,
    default: 0,
  },
  followingCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("user", user);
