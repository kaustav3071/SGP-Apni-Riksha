const userModel = require('./models/user.model');
const saarthiModel = require('./models/saarthi.model');

let io; // Declare io in the global scope

function initializeSocket(server) {
    io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data; // Destructure userId and userType from data
            console.log(`User with ID ${userId} joined as ${userType}`); // Corrected log statement
        
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'saarthi') {
                await saarthiModel.findByIdAndUpdate(userId, { socketId: socket.id });
                socket.join(userId); // Join the saarthi's room
        
                socket.on('message', (msg) => {
                    console.log(`Message from ${userId}: ${msg}`);
                    io.to(userId).emit('message', msg); // Send message to the specific saarthi
                });
        
                socket.on('disconnect', () => {
                    console.log(`Saarthi disconnected: ${socket.id}`);
                });
            }
        });
        
        socket.on('testEvent', (data) => {
            console.log('Test event received:', data);
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });

        socket.on('message', (msg) => {
            console.log(`Broadcast message: ${msg}`);
            io.emit('message', msg); // Broadcast the message to all connected clients
        });
    });
}

function sendMessagetoSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message);
    } else {
        console.error('Socket.io instance is not initialized. Cannot send message.');
    }
}

module.exports = {
    initializeSocket,
    sendMessagetoSocketId
};

