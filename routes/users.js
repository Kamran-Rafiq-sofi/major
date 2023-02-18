// const express = require('express');
// const router=express.Router();
// const passport=require('passport');
// const userController=require('../controllers/user_controller');
// router.get('/profile',userController.profile);

// // router.get('/profile',passport.checkAuthentication,userController.profile);

// router.get('/signUp',userController.signUp);


// router.get('/signIn',userController.signIn);

// router.post('/create',userController.create);
// router.post('/create-session',userController.createSession);
// router.get('/Delete-Session',userController.DeleteSession);
// router.post('/create_session',passport.authenticate(
//     'local',
//     {
//         failureRedirect:'/users/signIn'
//     }
// ),userController.create_session);
// module.exports = router;



// FOR PASSPORT
const express = require('express');
const router=express.Router();
const passport=require('passport');
const PassportLocal=require('../config/passport-local-strategy');
const userController=require('../controllers/user_controller');


// // router.get('/profile',PassportLocal.checkAuthentication,userController.profile);
router.get('/profile',userController.profile);

router.get('/signUp',userController.signUp);


router.get('/signIn',userController.signIn);

router.post('/create',userController.create);
// router.post('/create-session',userController.createSession);

router.post('/create-session',PassportLocal.authenticate(
    'local',
    {
        failureRedirect:'/users/signIn'
        
    }
    
),userController.createsession);
// router.get('/signout', userController.destroysession);
module.exports = router;



