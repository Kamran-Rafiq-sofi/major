// const Post=require('../models/post');
// const Comment=require('../models/comment');

// module.exports.create=function(req,res){
//     Post.create({
//         content:req.body.content,
//         user:req.user._id
//     },
//     function(err,post){
// if(err){
//     console.log("error");
//     return ;
// }
// return res.redirect('back');
//     });
// };

// // const post=new Post({
    
// //         Content:req.body.content,
// //         user:req.user._id
// //     });

// //     post.save(function(err,result){
// // if(err){
// //     console.log("error");
// //     return res.status(500).json({error:err});
// // }
// // return res.status(201).json({message:'post created',post:result});
// //     });
// // };

// module.exports.destroy =function(req,res){
//     Post.findById(req.params.id,function(err,post,user){

// if(post.user==req.user.id){

//     post.remove();
//     Comment.deleteMany({post:req.params.id},function(err){
// return res.redirect('back');
//     });
// }
// else{
//     return res.redirect('back');

// }
//     });
// }


const Post=require('../models/post');
const Comment=require('../models/comment');
const  postsMailer  = require('../mailers/posts_mailer');
const Like=require('../models/like');

module.exports.create=async function(req,res){
    try{
   let post= await Post.create({
        content:req.body.content,
        user:req.user._id
    });
    post=await post
    .populate('user','name email')
  //  .execPopulate();
   postsMailer.newPost(post);
    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message:"post created"
        });
    }
    req.flash('success',"post created successfully");

return res.redirect('back');
    }
    catch(err){
        req.flash('success',"post not created" );
        console.error("error",err);
        return;
    }
};

// const post=new Post({
    
//         Content:req.body.content,
//         user:req.user._id
//     });

//     post.save(function(err,result){
// if(err){
//     console.log("error");
//     return res.status(500).json({error:err});
// }
// return res.status(201).json({message:'post created',post:result});
//     });
// // });

module.exports.destroy =    async function(req,res){
    try{
   let post=await Post.findById(req.params.id);

if(post.user==req.user.id){
    await Like.deleteMany({likeable:post,onModel:'Post'});
    await Like.deleteMany({_id:{$in:post.comments}});

    post.remove();
    await Comment.deleteMany({post:req.params.id});

    if(req.xhr){
        return res.status(200).json({
            data:{
                post_id:req.params.id
            },
            message:"post deleted"
        });
    }
    req.flash('success',"post destroyed successfully");
return res.redirect('back');
    }

else{
    req.flash('error',"you arent authorised");
    return res.redirect('back');

}
    }
    catch(err){
        req.flash('error',"post not destroyed");
        console.log("error",err);
        return res.redirect('back');
    }
    }
