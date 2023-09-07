const mongoose = require("mongoose");

const comment = mongoose.Schema({
  postId: { required: true, type: String },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  comment: { required: true, type: String },
});

module.exports = mongoose.model("comment", comment);
