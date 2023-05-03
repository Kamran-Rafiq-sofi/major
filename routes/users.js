// const express = require('express');
// const router=express.Router();

// const userController=require('../controllers/user_controller');
// router.get('/profile',userController.profile);



// router.get('/sign-up',userController.signUp);


// router.get('/sign-in',userController.signIn);

// router.post('/create',userController.create);
// router.post('/create-session',userController.createSession);
// // router.get('/Delete-Session',userController.DeleteSession);

// module.exports = router;



// FOR PASSPORT
const express = require('express');
const router=express.Router();
const passport=require('passport');
// const PassportLocal=require('../config/passport-local-strategy');
const userController=require('../controllers/user_controller');

//  router.get('/profile',passport.checkAuthentication,userController.profile);

// router.get('/profile',userController.profile);
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);


router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);
// router.post('/create-session',userController.createSession);

router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'
        
        
    },
    
),userController.createsession);
router.get('/sign-out', userController.destroysession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate(
    'google',
    {
        failureRedirect:'/users/sign-in'
        
        
    }),userController.createsession);
module.exports = router;






