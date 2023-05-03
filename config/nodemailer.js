const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment');
let transporter=nodemailer.createTransport(
//     {
//     service:'gmail',
//     host:'smtp.gmail.com',
//     port:587,
//     secure:false,
//     auth:{
//         user:'kamranrafiq805@gmail.com',
//         pass:'snkmstzzfudyabvu'
//     }
// }
env.smtp
);
let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("error in rendering template",err);
                return;

            }
            mailHTML=template;
        }
    )
    return mailHTML;
}
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}



// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');

// const oauth2Client = new google.auth.OAuth2(
//     "967172063072-g9qdgd8704v4tp0jub8s2gqfasqvljtr.apps.googleusercontent.com",
//     "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",
//     "http://localhost:8000/users/auth/google/callback" // Redirect URL
// );

// // Set the credentials to be used with nodemailer
// // const accessToken = 'YOUR_ACCESS_TOKEN';
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: 'YOUR_EMAIL_ADDRESS',
//     accessToken,
//     clientId: '967172063072-g9qdgd8704v4tp0jub8s2gqfasqvljtr.apps.googleusercontent.com ',
//     clientSecret:     "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",

//     // refreshToken: 'YOUR_REFRESH_TOKEN',
//   },
// });

// // Send the email
// const mailOptions = {
//   from: 'YOUR_EMAIL_ADDRESS',
//   to: 'TO_EMAIL_ADDRESS',
//   subject: 'EMAIL_SUBJECT',
//   html: '<p>EMAIL_BODY</p>',
// };
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
