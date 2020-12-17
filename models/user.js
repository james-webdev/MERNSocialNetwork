const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name is required",
  },

  email: {
    type: String,
    required: "email is required",
  },

  password: {
    type: String,
    required: "password is required",
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
