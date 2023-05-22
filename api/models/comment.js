const mongoose = require("mongoose");

const comment = mongoose.Schema({
  postId: { required: true, type: String },
  profileId: { required: true, type: String },
  comment: { required: true, type: String },
});

module.exports = mongoose.model("comment", comment);
