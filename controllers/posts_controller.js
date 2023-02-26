const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },
    function(err,post){
if(err){
    console.log("error");
    return ;
}
return res.redirect('back');
    });
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
// };

