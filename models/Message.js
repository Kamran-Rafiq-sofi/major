const mongoose=require('mongoose');
// const User=require('../models/user');
const messageSchema=new mongoose.Schema({
    chatroom:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'chatroom'


    },
    message:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:'chatroom is required',
        ref:'User'
    },



},
{
    timestamps:true
}

);


const Message=mongoose.model('Message',messageSchema);
module.exports = Message;

// module.exports=mongoose.model('Message',messageSchema);
