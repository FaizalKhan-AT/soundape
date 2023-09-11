const mongoose = require("mongoose");

const following = mongoose.Schema({
  userId: { required: true, type: String },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("following", following);
