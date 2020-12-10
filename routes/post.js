const express = require('express');
const {postsIndex, createPost, postShow, postById, isPoster, deletePost} = require('../controllers/post');
const {requireSignIn, userById} = require('../controllers/user');


const router = express.Router();

router.get('/', postsIndex);
router.get('/post/:postId', postShow);
router.delete('/post/:postId', requireSignIn, isPoster, deletePost);
router.post('/post/new/:userId', requireSignIn, createPost);


router.param('userId', userById);
router.param('postId', postById);

module.exports = router;
