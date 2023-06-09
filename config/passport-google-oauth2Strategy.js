const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment');

passport.use(new googleStrategy({
    // clientID:"967172063072-g9qdgd8704v4tp0jub8s2gqfasqvljtr.apps.googleusercontent.com",
    // clientSecret:"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",
    // callbackURL:"http://localhost:8000/users/auth/google/callback"
    clientID:env.google_client_ID,
    clientSecret:env.google_client_Secret,
    callbackURL:env.google_call_back_URL
},
function(accessToken,refreshToken,profile,done){
    //find user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in google authentication",err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null,user);
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },
         function(err,user){
            if(err){
                console.log("error in google creation",err);
            }
            return done(null,user);
         });
        }
    });
}


));
module.exports=passport;