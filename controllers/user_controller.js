// const User=require('../models/user');
// module.exports.profile=function(req,res){
//     // res.end('<h1> user setups</h1>');

//     res.render('profile', {
//         title:'Profile'
//     });
// }


                                   // Non Accessible one


// const db=require('../config/mongoose');
// const User=require('../models/user');
// module.exports.profile=function(req,res){
    // res.end('<h1> user setups</h1>');

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



                                  //  FOR SIGNUP



// module.exports.signUp=function(req,res){
    // res.end('<h1>Liked</h1>');

//     return res.render('signup', {
//         title:'users | signup'
    
//     });
// }


                                //  FOR SIGNIN


// module.exports.signIn=function(req,res){
    // res.end('<h1>Liked</h1>');

//     return res.render('signin', {
//         title:'users | signin'
//     });
// }



                                    // ACTION FOR SIGNUP




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
 


                                           // ACTION FOR SIGNIN



// module.exports.createSession=function(req, res){


                                             // finfUser


    // User.findOne({email:req.body.email},function(err, user){
    //     if(err){
    //         console.log("error in signing in");
    //         return
    //     }

                                                 // userfoud

        // if(user){


                                             //password mismatch
                                             // user of schema


            // if(User.password!=req.body.password) 
            // {
            //     return res.redirect('back');
            // }

                                            // handle session


        // else{

                                            // userid of schema

        // res.cookie('User_id', user.id)
        // return res.redirect('/users/profile');
        // }
        // }

        // else{

                                        // handle not found


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



const User=require('../models/user');
module.exports.profile=function(req,res){
    // res.end('<h1> user setups</h1>');
    // User.findOne({email:req.body.email}, function(err, user){
    //     if(user){
    res.render('profile', {
        title:'Profile',
        
    });
}
//     });
// }


// Non Accessible one

// const User=require('../models/user');
// module.exports.profile=function(req,res){
//     // res.end('<h1> user setups</h1>');

//     if(req.cookies.id){
//         User.findById(req.cookies.id,function(err,user){
//             if(user){
//                 return res.render('/users/profile', {
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



// // for signup
module.exports.signUp=function(req,res){
    // res.end('<h1>Liked</h1>');

    // sign up authentication
    // if(req.isAuthenticated()){
    //     return res.redirect('/users/profile')

    // }

    return res.render('signup', {
        title:'users | signup'
    
    });
}


// // for signin
module.exports.signIn=function(req,res){
//     // res.end('<h1>Liked</h1>');


// //  // sign in authentication
//  if(req.isAuthenticated()){
//     return res.redirect('/users/profile')

// }

    return res.render('signin', {
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
    return res.redirect('/users/signIn');
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
    return res.redirect('/~');

}

// module.destroysession=function(req,res){
//     req.logout();
//     return res.redirect('/');
// }