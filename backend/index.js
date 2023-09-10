
// WebSocket server set up

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.status(200).send("Welcome");
    }
});

const PORT = process.env.PORT || 5000


// Adding CORS headers to allow requests from frontend domain
server.on('request', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://fire-chat-access.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
})

const io = socketIo(server)

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

