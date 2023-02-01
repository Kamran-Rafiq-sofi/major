const express=require('express');
const app=express();
const port=8000;


app.listen(port, function(err){
    if (err) {
        // console.log("error on port " + port);
        console.log(`error on port :${port}`);
    }

    console.log(`successfully running on :${port}`);
});