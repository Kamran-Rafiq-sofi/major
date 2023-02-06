const express = require('express');
const router=express.Router();
const signInController=require('../controllers/signin_controller');
router.get('/signIn',signInController.signIn);
module.exports = router;