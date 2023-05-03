const nodemailer=require('../config/nodemailer');
// const user=require('../models/user');
// const comment=require('../models/comment');

// this is new way
exports.newComment=(comment)=>{
    console.log('Inside mailer', comment);
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
from:'zainrafiq628@gmail.com',
to:comment.user.email,
subject:"new comment published",
html:htmlString
// html:'<h1>hurrah</h1>'
    },(err,info)=>{
        if(err){
            console.log("error",err);
            return;

        }
    
    console.log("published",info);
    return;
     } );
}