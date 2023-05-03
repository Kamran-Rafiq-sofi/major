const Post=require('../../../models/post');
const Comment=require('../../../models/comment')
module.exports.index = async function(req,res){
    
        let posts=await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
    return res.json(200,{
        message:"list of posts",
        // posts:[]
        posts:posts
        
    })
}

// module.exports.destroy =    async function(req,res){
//     try{
//    let post=await Post.findById(req.params.id);

// // if(post.user==req.user.id){

//     post.remove();
//     await Comment.deleteMany({post:req.params.id});
//     return res.json(200,{
//         message:"posts and associated deleted successfully"
        
        
//     })

//     // if(req.xhr){
//     //     return res.status(200).json({
//     //         data:{
//     //             post_id:req.params.id
//     //         },
//     //         message:"post deleted"
//     //     });
//     // }
//     // req.flash('success',"post destroyed successfully");
// // return res.redirect('back');
//     }

// // else{
// //     req.flash('error',"you arent authorised");
// //     return res.redirect('back');

// // }
//     // }
//     catch(err){
//         // req.flash('error',"post not destroyed");
//         console.log("error",err);
//         return res.json(500,{
//             message:"Internal server error"
         
            
//         });
//         // return;
//     }
//     }

module.exports.destroy =    async function(req,res){
    try{
   let post=await Post.findById(req.params.id);

if(post.user==req.user.id){

    post.remove();
    await Comment.deleteMany({post:req.params.id});
    // return res.json(200,{
    //     message:"posts and associated deleted successfully"
        
        
    // })


    return res.status(200).json({
        message:"posts and associated deleted successfully"
    })

    // if(req.xhr){
    //     return res.status(200).json({
    //         data:{
    //             post_id:req.params.id
    //         },
    //         message:"post deleted"
    //     });
    // }
    // req.flash('success',"post destroyed successfully");
// return res.redirect('back');
    }

else{
    // req.flash('error',"you arent authorised");
    // return res.redirect('back');

    // return res.json(401,{
    //     message:"you arent authorised"
     
        
    // });
    return res.status(401).json({
        message:"You arent authorised"
    })
}
    }
    catch(err){
        // req.flash('error',"post not destroyed");
        console.log("error",err);
        // return res.json(500,{
        //     message:"Internal server error"
         
            
        // });


        return res.status(500).json({
            message:"Internal server error"
        })
        // return;
    }
    }