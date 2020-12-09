const express = require('express');
const { usersIndex, userShow, userById, signUp, signIn, signOut} = require('../controllers/user')



const router = express.Router();


router.get('/users', usersIndex);
router.get('/user/:userId', userShow);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);



router.param('userId', userById);

module.exports = router;
