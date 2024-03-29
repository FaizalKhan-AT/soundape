const mongoose = require("mongoose");

const like = mongoose.Schema({
  postId: { required: true, type: String },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("like", like);
