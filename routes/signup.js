const express = require('express');
const router=express.Router();
const signUpController=require('../controllers/signup_controller');
router.get('/signUp',signUpController.signUp);
module.exports = router;