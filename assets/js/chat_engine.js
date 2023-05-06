// class ChatEngine{
//     constructor(chatBoxId,userEmail){
//         this.chatBox=$(`#${chatBoxId}`);
//         this.userEmail=userEmail;
//         this.socket=io.connect('http://34.238.255.83:5000');
//         if(this.userEmail){
//             this.connectionHandler();

//         }
//     }
//     connectionHandler(){
//         let self=this;
//         this.socket.on('connect',function(){
//             console.log('connection established using socket');
        
//         self.socket.emit('join_room',{
//             user_email:self.userEmail,
//             chatroom:'Social'
//         });
//         self.socket.on('user_joined',function(data){
//             console.log("a user has joined a chat room",data);
//         });
//     });
//     $('#send-message').click(function(){
//         let msg=$('#chat-message-input').val();
//         if(msg!=''){
//             self.socket.emit('send_message',{
//                 message:msg,
//                 user_email:self.userEmail,
//                 chatroom:'Social'
//             });
//         }
//     });
//     self.socket.on('receive_message',function(data){
//         console.log("message received",data.message);
//         let newMessage=$('<li>');
//         let messageType='other-message';
//         if (data.user_email==self.userEmail){
//             messageType='self-message';
//         }
//         newMessage.append($('<span>',{
//             'html':data.message
//         }));
//         // newMessage.append($('<sub>',{
//         //     'html':data.user_email
//         // }));
//         newMessage.addClass(messageType);
//         $('#chat-messages-list').append(newMessage);
//     });
//     }
// }


class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self=this;
        this.socket.on('connect',function(){
            console.log('connection established using socket');
        
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'Social'
            });

            self.socket.on('user_joined',function(data){
                console.log("a user has joined a chat room",data);
            });
        });

        $('#send-message').click(function(){
            let msg=$('#chat-message-input').val();
            if(msg!=''){
                // Emit the message to the server
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'Social'
                });

                // Send the message to the server to store in database
                $.ajax({
                    type: 'post',
                    url: '/message/create',
                    data: {
                        content: msg,
                        chatroom: 'Social'
                    },
                    success: function(data){
                        console.log(data);
                    },
                    error: function(error){
                        console.log(error.responseText);
                    }
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log("message received",data.message);
            let newMessage=$('<li>');
            let messageType='other-message';
            if (data.user_email==self.userEmail){
                messageType='self-message';
            }
            newMessage.append($('<span>',{
                'html':data.message
            }));
            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        });
    }
} 





// class ChatEngine{
//     constructor(chatBoxId,userEmail){
//         this.chatBox=$(`#${chatBoxId}`);
//         this.userEmail=userEmail;
//         this.socket=io.connect('http://localhost:5000');
//         if(this.userEmail){
//             this.connectionHandler();

//         }
//     }

//     connectionHandler(){
//         let self=this;
//         this.socket.on('connect',function(){
//             console.log('connection established using socket');
        
//         self.socket.emit('join_room',{
//             user_email:self.userEmail,
//             chatroom:'Social'
//         });
//         self.socket.on('user_joined',function(data){
//             console.log("a user has joined a chat room",data);
//         });
//     });

//     $('#send-message').click(function(){
//         let msg=$('#chat-message-input').val();
//         if(msg!=''){
//             let data={
//                 message:msg,
//                 user_email:self.userEmail,
//                 chatroom:'Social'
//             };
//             self.socket.emit('send_message',data);

//             // save message to database
//             $.ajax({
//                 type: 'post',
//                 url: '/message/create',
//                 data: JSON.stringify(data),
//                 contentType: 'application/json',
//                 success: function(response){
//                     console.log(response);
//                 },
//                 error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         }
//     });

//     self.socket.on('receive_message',function(data){
//         console.log("message received",data.message);
//         let newMessage=$('<li>');
//         let messageType='other-message';
//         if (data.user_email==self.userEmail){
//             messageType='self-message';
//         }
//         newMessage.append($('<span>',{
//             'html':data.message
//         }));
//         // newMessage.append($('<sub>',{
//         //     'html':data.user_email
//         // }));
//         newMessage.addClass(messageType);
//         $('#chat-messages-list').append(newMessage);
//     });
//     }
// }

