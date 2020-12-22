const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  created: {
    type: Date,
    default: Date.now,
  },

  photo: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("User", userSchema);
