// const Message=require('../models/message');
// const Post=require('../models/post');
// const user=require('../models/user');
// // const Message = require('../models/message');

// module.exports.chatSockets=function(socketServer){
//     let io=require('socket.io')(socketServer);
//     io.sockets.on('connection',function(socket){
//         console.log("new connection received",socket.id);
//         socket.on('disconnect',function(){
//             console.log("socket disconnected")
//         });
//         socket.on('join_room',function(data){
//             console.log("joining request received",data);
//             socket.join(data.chatroom);
//             io.in(data.chatroom).emit('user_joined',data);
//         })
//         socket.on('send_message',function(data){
//             io.in(data.chatroom).emit('receive_message',data);
//         });
//     });
//     }


const Message = require('../models/Message');

module.exports.chatSockets = function(socketServer) {
  let io = require('socket.io')(socketServer);

  io.sockets.on('connection', function(socket) {
    console.log('new connection received', socket.id);

    // Joining chatroom
    socket.on('join_room', function(data) {
      console.log('joining request received', data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit('user_joined', data);

      Message.find({ chatroom: data.chatroom }, function(error, messages) {
        if (error) {
          console.log('Error in finding messages:', error);
          return;
        }

        io.in(data.chatroom).emit('messages_list', messages);
      });
    });

    // Sending message
    socket.on('send_message', function(data) {
      console.log('message sent', data);

      let message = new Message({
        content: data.message,
        user_email: data.user_email,
        chatroom: data.chatroom
      });

      message.save();

      io.in(data.chatroom).emit('receive_message', data);
    });
  });
}
