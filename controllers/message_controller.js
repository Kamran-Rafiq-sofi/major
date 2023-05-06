// const Message = require('../models/message');

// module.exports.getMessages = async function(req, res) {
//   try {
//     const messages = await Message.find({ chatroom: req.params.id })
//       .populate('user', 'name email')
//       .sort({ createdAt: 1 });

//     return res.status(200).json({
//       success: true,
//       data: messages
//     });
//   } catch (err) {
//     console.log('Error in getting messages:', err);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };



// const Chatroom = require('../models/chatroom');
// const Message = require('../models/message');

// // Create a new chat room
// exports.createChatRoom = async (req, res) => {
//   try {
//     const chatroom = new Chatroom({
//       name: req.body.name
//     });
//     const savedChatroom = await chatroom.save();
//     res.status(201).json(savedChatroom);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // Get all messages for a chat room
// exports.getChatRoomMessages = async (req, res) => {
//   try {
//     const messages = await Message.find({ chatroom: req.params.chatroomId })
//       .populate('user', 'name')
//       .sort({ createdAt: 'asc' })
//       .exec();
//     res.status(200).json(messages);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
const Message = require('../models/Message');

module.exports.create = async function(req, res){
    try{
        let message = await Message.create({
            content: req.body.content,
            user: req.user._id,
            chatroom: req.body.chatroom
        });

        message = await message.populate('user', 'name email').execPopulate();

        // Emit the new message to all connected clients
        global.io.to(req.body.chatroom).emit('receive_message', {
            message: message
        });

        return res.status(200).json({
            message: "Message created",
            data: {
                message: message
            }
        });
    }
    catch(err){
        console.log('Error in creating message: ', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.getMessages = async function(req, res) {
  try {
    const messages = await Message.find({ chatroom: req.params.chatroom }).sort('createdAt');

    return res.json(200, {
      messages: messages
    });
  } catch (error) {
    console.log('Error in fetching messages:', error);
    return res.json(500, {
      message: 'Internal Server Error'
    });
  }
}


