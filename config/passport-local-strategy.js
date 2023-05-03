const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');

//Authentication

passport.use( new LocalStrategy(
    {
    usernameField:'email',
    passReqToCallback:true
    
},

function(req,email,password,done) {

    // find the user
    User.findOne({email: email},function(err,user) {
        
        if(err) {
console.log("error");
req.flash('error', err);
        return done(err);
    }

    if(!user || user.password!=password) {
        console.log("invalid password");
        req.flash('error', 'Invalid Username/Password');
        return done(null,false);
}


return done(null,user);
    });
}
));


// passport.use('local', new LocalStrategy(
//     {
//     usernameField:'email',
//     passReqToCallback:true
// },

// function(req,email,password,done) {

//     // find the user
//     User.findOne({email: email},function(err,user) 
//     {
        
//         if(err) {
// // console.log("error");
// req.flash('error', err);
//         return done(err);
//     }

//     if(!user){
//         return done(null, false,{ message: 'incorrect username.'});
//     }
//     if(!User.validPassword(password)){
//         return done(null, false,{ message: 'incorrect username.'});
//     }
        
//     return done(null,user);   




//     });
// }
// ));

// Serialize a function
passport.serializeUser(function(user,done) { 
    // console.log("error");
    done(null,user.id);
});


// deserialize a function

passport.deserializeUser(function(id,done) {
    User.findById(id,function(err,user) {
        // console.log("error");

        if(err){
            console.log("error in finding onr");
            return done(err);
        }
        // console.log("error");
        return done(null,user);
    });
});


passport.checkAuthentication=function(req,res,next){
// //     //if the user is signed in
    if(req.isAuthenticated()){
    
        return next();
    
    }
// //     // if not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res,next){
    if(req.isAuthenticated()){
//         // req.user contains current signrd inb user from the session cookie and we are just sending it to locals for views
        res.locals.user=req.user;
    }
    next();
}

module.exports =passport;
