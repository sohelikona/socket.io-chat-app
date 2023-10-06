// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http)

// app.get('/', (req, res) => {
//     // res.sendFile(path.dirname('public\index.html'));
//     // Returns: '/foo/bar/baz/asdf')
//     res.sendFile('C:/Users/Kona/Desktop/New folder/socket-io-chat-app/public/index.html');
// })

// let clients = 0;

// // io.on('connection', function(socket) {
// //     console.log('A user is connected')

// //     // setTimeout(function() {
// //     //     socket.send('Sent a message 4 seconds after connection!')
// //     // }, 4000)

// //     setTimeout(function(){
// //         // Sending an object when emmiting an event
// //         socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
// //      }, 4000);

// //     socket.on('disconnect', function() {
// //         console.log('A user is disconnected')
// //     })
// // })


// io.on('connection', function(socket){
//     clients++;
//     io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
//     socket.on('disconnect', function () {
//        clients--;
//        io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
//     });
//  });

// http.listen(3000, function(){
//     console.log('listening on *:3000');
//  });


// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// // var socket = io();

// app.get('/', function(req, res){
//     res.sendFile('C:/Users/Kona/Desktop/New folder/socket-io-chat-app/public/index.html');
// });

// var roomno = 1;
// io.on('connection', function(socket){
//    socket.join("room-"+roomno);
//    //Send this event to everyone in the room.
//    io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
// })

// http.listen(3000, function(){
//    console.log('listening on localhost:3000');
// });


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile('C:/Users/Kona/Desktop/New folder/socket-io-chat-app/public/index.html');});

users = [];
io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('setUsername', function(data){
       console.log(data);
       if(users.indexOf(data) > -1){
          socket.emit('userExists', data + ' username is taken! Try some other username.');
       } else {
          users.push(data);
          socket.emit('userSet', {username: data});
       }
    });
    socket.on('msg', function(data){
       //Send message to everyone
       io.sockets.emit('newmsg', data);
    })
 });
http.listen(3333, function(){
   console.log('listening on localhost:3333');
});