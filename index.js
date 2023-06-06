const express = require('express');
const app = express();
var http = require('http');
const cors = require("cors");
var {Server} = require('socket.io');
app.use(cors());
 
const server = http.createServer(app);

const io = new Server(server , {
    cors:{
        origin: "https://chatapp48.netlify.app"
    }
} ) 


app.get("/", (req,res)=>{
    res.send("running server well and good");
})

io.on('connection', function (socket) {

    socket.on("join-room" , (data)=>{
        console.log(socket.id + " joinedRoom: " + data);
        socket.join(data);
    })

    socket.on('send-message', (data) => {
        socket.to(data.room).emit("recieve-message" , data);
    });
    socket.on('disconnect', function () {
        delete listUname[username];
        console.log('user ' + username + '  disconnected');

    });


});
server.listen(3001,  ()=>{
    console.log('listening on *:3001');
});
