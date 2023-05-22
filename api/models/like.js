const mongoose = require("mongoose");

const like = mongoose.Schema({
  postId: { required: true, type: String },
  profileId: { required: true, type: String },
});

module.exports = mongoose.model("like", like);
