const express = require('express');
const cors = require('cors');
const app = express()
const mongoose = require('mongoose');
const passport = require('./utils/passport-config');
const userRoutes = require('./routes/userRoutes')
require('dotenv').config()

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server)

const PORT = process.env.PORT || 5000




mongoose.connect('mongodb+srv://hbeyondall1:cluster2vChat@cluster2.tkwewyu.mongodb.net/vChat?retryWrites=true&w=majority',  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error("####  Database connection error  ####\n", error));
db.once('open', () => console.log('Atlas connected.'))




// Configure CORS 
app.use(cors({
    origin: 'https://fire-chat-access.netlify.app', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Internal server error from main file.'
    });
  });

// web socket event handling
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


app.use('/users', userRoutes)





server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}...`);
});

