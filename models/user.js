const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

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

  following: [{ type: ObjectId, ref: "User" }],

  followers: [{ type: ObjectId, ref: "User" }],

  role: {
    type: String,
    default: "subscriber",
  },
});

module.exports = mongoose.model("User", userSchema);
