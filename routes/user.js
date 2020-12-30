const express = require("express");
const mongoose = require("mongoose");
const {
  usersIndex,
  userShow,
  userById,
  signUp,
  signIn,
  signOut,
  userProfilePhoto,
  userPhoto,
  addFollower,
  addFollowing,
  removeFollowing,
  removeFollower,
  getFollowers,
  deleteUser,
} = require("../controllers/user");

const { deletePostsByUserId } = require("../controllers/post");

mongoose.set("useFindAndModify", false);

const router = express.Router();

router.put("/user/follow", addFollowing, addFollower);
router.put("/user/unfollow", removeFollowing, removeFollower);
router.get("/followers/:userId", userShow);
router.get("/users", usersIndex);
router.get("/user/:userId", userShow);
router.put("/user/:userId", userProfilePhoto);
router.get("/user/photo/:userId", userPhoto);
router.delete("/user/:userId", deleteUser, deletePostsByUserId);

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

router.param("userId", userById);

module.exports = router;
