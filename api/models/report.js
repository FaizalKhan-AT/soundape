const mongoose = require("mongoose");

const report = mongoose.Schema({
  postId: { required: true, type: String },
  count: { required: true, type: Number, default: 1 },
});

module.exports = mongoose.model("report", report);
