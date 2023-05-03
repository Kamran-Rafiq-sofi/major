const mongoose=require('mongoose');
// const User=require('../models/user');
const likeSchema=new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.ObjectId,
        
    },
    likeable:{
        type:mongoose.Schema.ObjectId,
        required:true,
        refPath:'onModel'

    },
    // type of liked object since dynamically referenced

    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }


},
{
    timestamps:true
}

);


const Like=mongoose.model('Like',likeSchema);
module.exports = Like;