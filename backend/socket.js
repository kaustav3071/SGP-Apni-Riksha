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

        // Handle 'join' event
        socket.on('join', async (data) => {
            const { userId, userType } = data; // Destructure userId and userType from data
            console.log(`User with ID ${userId} joined as ${userType}`);
            console.log(`Socket ID: ${socket.id}`);

            try {
                if (userType === 'user') {
                    const result = await userModel.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
                    if (!result) {
                        console.error(`User with ID ${userId} not found`);
                    } else {
                        console.log("User socketId updated:", result);
                    }
                } else if (userType === 'saarthi') {
                    const result = await saarthiModel.findByIdAndUpdate(userId, { socketId: socket.id }, { new: true });
                    if (!result) {
                        console.error(`Saarthi with ID ${userId} not found`);
                    } else {
                        console.log("Saarthi socketId updated:", result);
                    }
                    socket.join(userId); // Join the Saarthi's room
                }
            } catch (error) {
                console.error("Error updating socketId:", error);
            }
        });

        socket.on('update-location-saarthi', async (data) => {
            console.log("Saarthi location update received:", data);
            const { saarthiId, location } = data; // Destructure saarthiId and location from data

            try {
                if (!location || !location.latitude || !location.longitude) {
                    console.error("Invalid location data:", location);
                    return;
                }
                const result = await saarthiModel.findByIdAndUpdate(saarthiId, { 
                    location:{
                        latitude: location.latitude,
                        longitude: location.longitude
                    } }, { new: true });
                if (!result) {
                    console.error(`Saarthi with ID ${saarthiId} not found`);
                } else {
                    console.log("Saarthi location updated:", result);
                }
            } catch (error) {
                console.error("Error updating Saarthi location:", error);
            }
        });

        // Handle Saarthi disconnection
        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);
            try {
                // Clear socketId for both users and Saarthis
                const userResult = await userModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
                const saarthiResult = await saarthiModel.findOneAndUpdate({ socketId: socket.id }, { socketId: null });

                if (userResult) {
                    console.log(`User socketId cleared for ID: ${userResult._id}`);
                }
                if (saarthiResult) {
                    console.log(`Saarthi socketId cleared for ID: ${saarthiResult._id}`);
                }
            } catch (error) {
                console.error("Error clearing socketId on disconnect:", error);
            }
        });

        // Handle ride request
        socket.on("ride-request", (data) => {
            console.log("Ride request received:", data);
            io.to(data.saarthiId).emit("ride-request", data); // Send ride request to specific Saarthi
        });

        // Handle ride acceptance
        socket.on("ride-accepted", (data) => {
            console.log("Ride accepted by Saarthi:", data);
            io.to(data.rideId).emit("ride-accepted", data); // Notify user about ride acceptance
        });

        // Handle ride cancellation
        socket.on("ride-cancelled", (data) => {
            console.log("Ride cancelled by Saarthi:", data);
            io.to(data.rideId).emit("ride-cancelled", data); // Notify user about ride cancellation
        });
    });
}

// Function to send a message to a specific socket ID
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

