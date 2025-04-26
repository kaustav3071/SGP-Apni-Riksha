const http = require('http');
const app = require('./App');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Pass the server instance to initializeSocket
initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});