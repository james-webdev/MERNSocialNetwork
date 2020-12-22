const express = require("express");
const {
  usersIndex,
  userShow,
  userById,
  signUp,
  signIn,
  signOut,
  userProfilePhoto,
  userPhoto,
} = require("../controllers/user");

const router = express.Router();

router.get("/users", usersIndex);
router.get("/user/:userId", userShow);
router.put("/user/:userId", userProfilePhoto);
router.get("/user/photo/:userId", userPhoto);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

router.param("userId", userById);

module.exports = router;
