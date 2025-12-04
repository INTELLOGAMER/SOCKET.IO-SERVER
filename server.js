
const PORT = process.env.PORT || 8000;

const io = require('socket.io')(PORT, {
    cors: {
        
        origin: "https://chattingappbyrkdutta.netlify.app", 
        
        methods: ["GET", "POST"]
    }
});

// ... बाकी कोड
console.log(`Server running on port ${PORT}`);
const users={};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]});
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });



});
