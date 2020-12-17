const express = require("express");
const {
  postsIndex,
  createPost,
  postShow,
  postById,
  isPoster,
  deletePost,
  photo,
} = require("../controllers/post");
const { requireSignIn, userById } = require("../controllers/user");

const router = express.Router();

router.get("/posts", postsIndex);
router.get("/post/:postId", postShow);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);
router.post("/post/new/:userId", requireSignIn, createPost);
router.get("/post/photo/:postId", photo);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
