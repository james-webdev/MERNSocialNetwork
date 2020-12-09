const express = require('express');
const {postsIndex, createPost} = require('../controllers/post');
const {requireSignIn, userById} = require('../controllers/user');


const router = express.Router();

router.get('/', postsIndex);
router.post('/post', requireSignIn, createPost);


router.param('userId', userById);

module.exports = router;
