// // const User=require('../models/user');
// // module.exports.profile=function(req,res){
// //     // res.end('<h1> user setups</h1>');

// //     res.render('profile', {
// //         title:'Profile'
// //     });
// // }


//                                    // Non Accessible one


// const db=require('../config/mongoose');
// const User=require('../models/user');
// module.exports.profile=function(req,res){
//     // res.end('<h1> user setups</h1>');

//     if(req.cookies.User_id){
//         User.findById(req.cookies.User_id,function(err,user){
//             if(User){
//                 return res.render('profile', {
//                     title:'Profile',
//                   user:user
//                 });
//             }

//       else{
//             return res.redirect('/users/signIn'); 
//       }
//         });
//     }
//     else{
//         return res.redirect('/users/signIn');
//     }

    
// }



//                                   //  FOR SIGNUP



// module.exports.signUp=function(req,res){
//     // res.end('<h1>Liked</h1>');

//     return res.render('signup', {
//         title:'users | signup'
    
//     });
// }


//                                 //  FOR SIGNIN


// module.exports.signIn=function(req,res){
//     // res.end('<h1>Liked</h1>');

//     return res.render('signin', {
//         title:'users | signin'
//     });
// }



//                                     // ACTION FOR SIGNUP




// module.exports.create=function(req, res){
//     if(req.body.password!=req.body.c_password){
//         return res.redirect('back');
//     }
//     User.findOne({email:req.body.email}, function(err, user){
//         if(err){
//             console.log("error in signingup");
//             return
//         }
//         if(!user){
// User.create(req.body,function(err,user){
//     if(err){
//         console.log("error in signingup");
//         return
//     }
//     return res.redirect('/users/signIn');
// });
//         }
//         else{
//             return res.redirect('back');
//         }
// });
//         }
 


//                                            // ACTION FOR SIGNIN



// module.exports.createSession=function(req, res){


//                                              // finfUser


//     User.findOne({email:req.body.email},function(err, user){
//         if(err){
//             console.log("error in signing in");
//             return
//         }

//                                                  // userfoud

//         if(user){


//                                              //password mismatch
//                                              // user of schema


//             if(User.password!=req.body.password) 
//             {
//                 return res.redirect('back');
//             }

//                                             // handle session


//         // else{

//                                             // userid of schema

//         res.cookie('User_id', user.id)
//         return res.redirect('/users/profile');
//         // }
//         }

//         else{

//                                         // handle not found


//             return res.redirect('/users/signUp');
//         }
//     });

// }

// module.exports.DeleteSession=function(req,res){


//     User.findOne({email:req.body.email},function(err, user){
//         if(err){
//             console.log("error in deleting");
//             return
//         }
//         if(User){
// // db.remo(User.id);

// return res.redirect("/users/signIn");
//         }
//         })
//     }
// //     if(User){
// //     return res.redirect('/users/signIn');
// // }

// // return res.redirect('back');
// // }









/// USING PASSPORT JS



// const User=require('../models/user');
// module.exports.profile=function(req,res){

//     res.render('user_profile', {
//         title:'Socialmedia || Profile',
        
//     });
// }



const { request } = require('express');
const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){

    User.findById(req.params.id,function(err,user){

        res.render('user_profile', {
            title:'Socialmedia || Profile',
            profile_user:user
    });

        
    
    });
}

// module.exports.update=function(req,res){

//     if(req.user.id==req.params.id){
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
//             return res.redirect('back');
//          });
//     }
//     else{
//         return res.status(401).send('Unauthorised');
//     }
// }



module.exports.update=async function(req,res){

    if(req.user.id==req.params.id){
        try{
       let user=await User.findById(req.params.id);
       User.uploadedAvatar(req,res, function(err){
        if(err){
            console.log("*****error******",err);
        }
        user.name=req.body.name;
        user.email=req.body.email;
        if(req.file){
            if(user.avatar){
                fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }
            user.avatar=User.avatarPath+ '/'+ req.file.filename;
        }
        user.save();
        return res.redirect('back');
        console.log(req.file);

       });
    }
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    //         return res.redirect('back');
    //      });
         
     }
    else{
        req.flash('error','Unauthorised')
        return res.status(401).send('Unauthorised');
    }
}


// Non Accessible one

// const User=require('../models/user');
// module.exports.profile=function(req,res){
// //     // res.end('<h1> user setups</h1>');

//     if(req.cookies.id){
//         User.findById(req.cookies.id,function(err,user){
//             if(user){
//                 return res.render('/users/user_profile', {
//                     title:'Profile',
//                   user:user
//                 });
//             }

//       else{
//             return res.redirect('/users/sign-in'); 
//       }
//         });
//     }
//     else{
//         return res.redirect('/users/sign-in');
//     }

    
// }



// // for signup
module.exports.signUp=function(req,res){
    // res.end('<h1>Liked</h1>');

    // sign up authentication
    if(req.isAuthenticated()){
        return res.redirect('/users/profile/req.params.id')
        // return res.redirect('back')

    }

    return res.render('user_sign_up', {
        title:'users | signup'
    
    });
}


// // for signin
module.exports.signIn=function(req,res){
//     // res.end('<h1>Liked</h1>');


// //  // sign in authentication
 if(req.isAuthenticated()){
    return res.redirect('/users/profile/req.body')
    // return res.redirect('back')

}

    return res.render('user_sign_in', {
        title:'users | signin'
    });
}


// // action for sign-up
module.exports.create=function(req, res){
    if(req.body.password!=req.body.c_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email}, function(err, user){
        if(err){
            console.log("error in signingup");
            return
        }
        if(!user){
User.create(req.body,function(err,user){
    if(err){
        console.log("error in signingup");
        return
    }
    return res.redirect('/users/sign-in');
});
        }
        else{
            return res.redirect('back');
        }
});
        }
 


// // // action for sign-in
// module.exports.createSession=function(req, res){
// //     // finfUser
// //     User.findOne({email:req.body.email},function(err, user){
// //         if(err){
// //             console.log("error in signing in");
// //             return
// //         }
// //         // userfoud
// //         if(user){
// //                //password mismatch
// //                // user of schema
// //             if(User.password!=req.body.password) 
// //             {
// //                 return res.redirect('back');
// //             }

// //         // handle session
// //         else{
// //             // userid of schema
// //         res.cookie('User_id', user.id)
// //         return res.redirect('/users/profile');
// //         }
// //         }

// //         else{
// //             // handle not found
// //             return res.redirect('/users/signUp');
// //         }
// //     });

// // }





// // action for sign-in
module.exports.createsession=function(req, res){
    req.flash('success',"logged in successfully");
    return res.redirect('/');

}

// module.exports.destroysession=function(req,res){
//     req.logout();
//     return res.redirect('/');
// }
module.exports.destroysession=function(req,res,next){
    req.logout(function(err){
if(err){
    return next(err);
}
req.flash('success',"logged out successfully");
return res.redirect('/');
    });
    
    
}
