const Comment=require('../models/comment');
const Post=require('../models/post');
const user=require('../models/user');
// const comment=require('../models/comment');
const  commentsMailer  = require('../mailers/comments_mailer');

const Like=require('../models/like');
// const queue=require('../config/kue');
// const commentEmailworker=require('../workers/comment_email_worker');

// module.exports.create=function(req,res){
//     Post.findById(req.body.post,function(err,post){
//   if(post){
//     Comment.create({
//         content:req.body.content,
//         post:req.body.post,
//         user:req.user._id

//     },

//     function(err,comment){
//         if(err){}
//         post.comments.push(comment);
//         post.save();
//         res.redirect('/');
//     });
    
    
//   }

//     });
//     commentsMailer.newComment(Comment);
// }





module.exports.create=async function(req,res){
  try{
 let post=await Post.findById(req.body.post);
if(post){
 let comment=await Comment.create({
      content:req.body.content,
      post:req.body.post,
      user:req.user._id,
      // post.comments.push(comment),
      // post.save();
  });
  // console.log('New comment:', comment);

   post.comments.push(comment);
  post.save();

//   // console.log('New comment:', comment);

  comment=await comment
  .populate('user','name email')
//  .execPopulate();
 commentsMailer.newComment(comment);
// let job=queue.create('emails',comment).save(function(err){
//   if(err){
//     console.log("error in creating",err);
//     return;
//   }
//   console.log("jonb enqueued",job.id);
// })
if (req.xhr){
  return res.status(200).json({
    data:{
        comment:comment
    },
    message:"comment created"
});

}

req.flash('success',"comment published")
return res.redirect('back');
}
}catch(err){
  req.flash('success',"post not created" );
  console.error("error",err);
  return;
}
}


// module.exports.create=async function(req,res){
//   try{
//  let post= Post.findById(req.body.post);
// if(post){
//  let comment=await Comment.create({
//       content:req.body.content,
//       post:req.body.post,
//       user:req.user._id

//   });
//   post.comments.push(comment);
//   post.save();


//  comment=await comment.populate('user','name email').execPopulate();
//  commentsMailer.newComment(comment);
// if (req.xhr){
//   return res.status(200).json({
//     data:{
//         comment:comment
//     },
//     message:"comment created"
// });

// }

// req.flash('success',"comment published")
// return res.redirect('back');
//   }
// }catch(err){
//   req.flash('success',"post not created" );
//   console.error("error",err);
//   return;
// }
// }

module.exports.destroy =function(req,res){
  Comment.findById(req.params.id,function(err,comment){
  
  if(comment.user==req.user.id){
    let postId=comment.post;
  
    comment.remove();
    Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}}, function(err,post)
    
    
    {

      return res.redirect('back');
    })
   
  
    
  }
  else{
    return res.redirect('back');
  
  }
    });
  }


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post =await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
await Like.deleteMany({likeable:comment._id,onModel:'Comment'});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}

