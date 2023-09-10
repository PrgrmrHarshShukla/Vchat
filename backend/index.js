
const express = require('express');
const cors = require('cors');
const app = express()
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);

const PORT = process.env.PORT || 5000

const io = socketIo(server)

// Configure CORS 
app.use(cors({
    origin: 'https://fire-chat-access.netlify.app', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  }));


io.on("connection", (socket) => {
    // console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        // console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
    });
});


server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}...`);
});

