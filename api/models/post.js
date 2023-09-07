const mongoose = require("mongoose");

const post = mongoose.Schema({
  userId: { required: true, type: String },
  audioUrl: { required: true, type: String },
  format: { required: true, type: String },
  likes: { required: true, type: Number, default: 0 },
  title: { required: true, type: String },
  reported: { type: Boolean, default: false },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("post", post);
