const express = require("express");
const {
  postsIndex,
  createPost,
  postShow,
  postById,
  isPoster,
  deletePost,
  photo,
  postsByUserId,
  postsByUserIdCount,
  like,
  unlike,
  deletePostsByUserId,
} = require("../controllers/post");
const { requireSignIn, userById } = require("../controllers/user");

const router = express.Router();
router.get("/posts", postsIndex);

router.put("/post/like", like);
router.put("/post/unlike", unlike);

router.get("/post/:postId", postShow);
router.delete("/post/:postId", requireSignIn, isPoster, deletePost);
router.post("/post/new/:userId", requireSignIn, createPost);
router.get("/post/photo/:postId", photo);
router.get("/posts/by/:userId", postsByUserId);
// router.get("/posts/count/:userId", postsByUserIdCount);
router.delete("/post/:postId", isPoster, deletePost);
// router.delete("/posts/by/:userId", deletePostsByUserId);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
