const mongoose=require('mongoose');
// const User=require('../models/user');
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // array id of comments so its loaded alongside posts
    comments:
   [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
        }
    ],
    likes:
    [
         {
         type:mongoose.Schema.Types.ObjectId,
         ref:'Like'
         }
     ]

},
{
    timestamps:true
}

);


const Post=mongoose.model('Post',postSchema);
module.exports = Post;