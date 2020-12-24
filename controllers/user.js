const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not ffffffound",
        });
      }
      req.profile = user;
      next();
    });
};

exports.hasAuthorisation = (req, res, next) => {
  console.log("req.auth :", req.auth);
  const authorised = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorised) {
    res.json({ message: "you are not authorised to carry out this action" });
  }
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

exports.usersIndex = (req, res) => {
  const users = User.find()
    .select("name email password")
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(err));
};

exports.userShow = (req, res) => {
  console.log(req.profile);
  //    res.json({ message: "you got your user" });
  return res.json(req.profile);
};

exports.signUp = (req, res) => {
  const user = new User(req.body);
  console.log("Creating user", user);
  user.save((err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({
      message: "signed up!",
    });
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      res.status(401).json({ message: "user does not exist!" });
      console.log(err);
      return;
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("myToken", token, { expire: new Date() + 5555 });
    console.log("USER :", user);
    console.log("TOKEN :", token);

    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signOut = (req, res) => {
  res.clearCookie("myToken");
  console.log("signed out!");
  res.json({ message: "you have successfully signed out" });
};

exports.userProfilePhoto = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let user = req.profile;

    user = _.extend(user, fields);

    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      console.log(result);
      res.json(result);
    });
  });
};

exports.userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType));
    return res.send(req.profile.photo.data);
  }
  next();
};

exports.addFollowing = (req, res, next) => {
  console.log("req.body :", req.body);
  User.findByIdAndUpdate(
    req.body.userId,
    { $push: { following: req.body.followId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

exports.addFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    { $push: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

exports.removeFollowing = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.userId,
    { $pull: { following: req.body.unFollowId } },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      next();
    }
  );
};

exports.removeFollower = (req, res) => {
  User.findByIdAndUpdate(
    req.body.unFollowId,
    { $pull: { followers: req.body.userId } },
    { new: true }
  )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
};

exports.getFollowers = (req, res, id) => {
  const followers = User.findById(id)
    .select("followers")
    .exec((err, followers) => {
      if (err || !followers) {
        return res.status(400).json({
          error: "Followers not ffound",
        });
      }
      res.json({ followers });
    });
};
