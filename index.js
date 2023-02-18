const express=require('express');
const cookieParser=require('cookie-parser');


const app=express();

const port=8000;
const sassMiddleware=require('sass-middleware');

// const Mongostore=require('connect-mongo')(session);
app.use(sassMiddleware(
    {
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle: 'extended',
    // prefix:'/css'
}));
// for layouts
const expressLayouts=require('express-ejs-layouts');

// for database
const db=require('./config/mongoose');


// libraries for session
const session=require('express-session');

const passport=require('passport');
const PassportLocal=require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
app.use(expressLayouts);

// individual css
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




// app.use('/',require('./routes/index'));
// view engine
app.set('view engine','ejs');
app.set('views','./views');
// const Mongostore=require('connect-mongo')(session);
// const Mongostore=require('connect-mongo');
app.use(session({
    name: 'Socialmedia',
    secret: 'blah',

    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*5)
    }
    // ,
    // store:new Mongostore.create({
    //     mongooseConnection: db,
    //     autoRemove:"disabled"
    // },
    // function(err){
    //     console.log("cant conncet");
    // }
    // )



    // store: Mongostore.create({
    //     
    //     mongoUrl:'mongodb://127.0.0.1/Socialmedia_development',
    //     autoRemove:"disabled"
    // },
    // function(err){
    //     console.log("cant conncet");
    // }
    // )

}));
app.use(PassportLocal.initialize());
app.use(PassportLocal.session());
// require('./path/to/passport/config/file')(passport);

// setAuth
// app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index'));
// app.use('/',require('./routes'));


app.listen(port, function(err){
    if (err) {
        // console.log("error on port " + port);
        console.log(`error on port :${port}`);
    }

    console.log(`successfully running on :${port}`);
});