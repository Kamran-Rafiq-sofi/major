const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home_controller');
console.log("router started");

router.get('/', homeController.home);

// from user.js

router.use('/users',require('./users'));
// from likes.js
router.use('/likes',require('./likes'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/api',require('./api'));


module.exports=router;

