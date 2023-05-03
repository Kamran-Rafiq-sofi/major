// module.exports.home = function(req,res){
// return res.end('<h1> Express is up to Use</h1>');
// res.cookie('user_id', 25);
// return res.render('home', {
//     title:'Home'
// });

// }



// const Post=require('../models/post');
// module.exports.home = function(req,res){
// Post.find({},function(err,posts){
//     return res.render('home', {
//         title:'Socialmedia || Home',
//         posts:posts
//     });
// });

    
// //     }

// const Post=require('../models/post');
// module.exports.home = function(req,res){
// Post.find({}).populate('user').exec(function(err,posts){
//     return res.render('home', {
//         title:'Socialmedia || Home',
//         posts:posts
//     });
// });

    
//     }


// const Post=require('../models/post');
// const User=require('../models/user');

// module.exports.home = function(req,res){
// Post.find({})
// .populate('user')
// .populate({
//     path:'comments',
//     populate:{
//         path:'user'
//     }
// })
// .exec(function(err,posts){
//     return res.render('home', {
//         title:'Socialmedia || Home',
//         posts:posts
//     });
// })

    
//     }




// const Post=require('../models/post');
// const User=require('../models/user');

// module.exports.home = function(req,res){
// Post.find({})
// .populate('user')
// .populate({
//     path:'comments',
//     populate:{
//         path:'user'
//     }
// })
// .exec(function(err,posts){
//     User.find({},function(err,users){
//         return res.render('home', {
//             title:'Socialmedia || Home',
//             posts:posts,
//             all_users:users
//     });

//     });
// })

    
//     }


const Post=require('../models/post');
const User=require('../models/user');

module.exports.home = async function(req,res){
    try{
let posts=await Post.find({})
.sort('-createdAt')
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user'
    },
    populate:{
        path:'likes'
    }
}).populate('comments').populate('likes');
let users=await User.find({});

        return res.render('home', {
            title:'Socialmedia || Home',
            posts:posts,
            all_users:users
    });
    }
    catch(err){
        console.log("error",err);
        return ;
    }
    
}

    
    


// module.exports.Actionname=function(req,res);