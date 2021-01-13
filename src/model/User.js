const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 2014,
    min: 6,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
