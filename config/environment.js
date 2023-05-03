const fs= require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');
const logDirectory=path.join(__dirname, '../production_logs');
// making directory and adding to it
fs.existsSync(logDirectory)||fs.mkdirSync(logDirectory);
// user createstream to create one
const accessLogStream= rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});
const development={
    name:'development',
    assets_path:'./assets',
    session_cookie_key:'blah',
    db:'Socialmedia_development',
    smtp: {
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'kamranrafiq805@gmail.com',
            pass:'snkmstzzfudyabvu'
        }
    },
    google_client_ID:"967172063072-g9qdgd8704v4tp0jub8s2gqfasqvljtr.apps.googleusercontent.com",
    google_client_Secret:"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",
    google_call_back_URL:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'Socialmedia',
    morgan:{
             mode:'dev',
             options:{stream:accessLogStream}
        }

    

}
const production={
    name:'production',
    // name:process.env.SOCIALMEDIA_ENVIRONMENT,
    assets_path:process.env.SOCIALMEDIA_ASSETS_PATH,
    // session_cookie_key:'blah',
     session_cookie_key:process.env.SESSION_COOKIE_KEY ,
    db:process.env.SOCIALMEDIA_DATABASE,
    smtp: {
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.GOOGLE_GMAIL_USERNAME,
            pass:process.env.GOOGLE_GMAIL_PASSWORD
        }
    },
    google_client_ID:process.env.GOOGLE_CLIENT_ID ,
    google_client_Secret:process.env.GOOGLE_CLIENT_SECRET ,
    google_call_back_URL:process.env.GOOGLE_CALLBACK_RURL ,
    // jwt_secret:'Socialmedia'
    jwt_secret:process.env.SOCIALMEDIA_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
   } 

    
}
// module.exports=development;
//  module.exports=eval(process.env.SOCIALMEDIA_ENVIRONMENT)==undefined? development:eval(process.env.SOCIALMEDIA_ENVIRONMENT);.
// console.log(process.env.SOCIALMEDIA_ENVIRONMENT);
module.exports=eval(process.env.SOCIALMEDIA_ENVIRONMENT)==undefined? development:eval(process.env.SOCIALMEDIA_ENVIRONMENT);

// module.exports=eval(process.NODE_ENV)==undefined? development:production;