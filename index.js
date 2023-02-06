const express=require('express');
const app=express();
const port=8000;


// for layouts
const expressLayouts=require('express-ejs-layouts');

// for database
const db=require('./config/mongoose');

app.use(express.static('./assets'));
app.use(expressLayouts);

// individual css
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.use('/',require('./routes/index'));
// view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if (err) {
        // console.log("error on port " + port);
        console.log(`error on port :${port}`);
    }

    console.log(`successfully running on :${port}`);
});