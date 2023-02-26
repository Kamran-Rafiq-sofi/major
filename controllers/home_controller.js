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

    
//     }

const Post=require('../models/post');
module.exports.home = function(req,res){
Post.find({}).populate('user').exec(function(err,posts){
    return res.render('home', {
        title:'Socialmedia || Home',
        posts:posts
    });
});

    
    }

// module.exports.Actionname=function(req,res);