const nodemailer=require('../config/nodemailer');
const user=require('../models/user');
const comment=require('../models/comment');

// this is new way
exports.newPost=(post)=>{
    console.log('Inside mailer', post);
    let htmlString=nodemailer.renderTemplate({post:post},'/posts/new_post.ejs')
    nodemailer.transporter.sendMail({
from:'zainrafiq628@gmail.com',
to:post.user.email,
subject:"new post published",
// html:'<h1>yup post published</h1>'
html:htmlString
    },(err,info)=>{
        if(err){
            console.log("error",err);
            return;

        }
    
    console.log("published",info);
    return;
     } );
}