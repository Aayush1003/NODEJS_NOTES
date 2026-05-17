// A simple HTTP server using the core 'http' module
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Set the response HTTP header with HTTP status and Content type
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    // Routing based on URL
    if (req.url === '/') {
        res.end(JSON.stringify({ message: "Hello World! This is the home route." }));
    } else if (req.url === '/about') {
        res.end(JSON.stringify({ message: "This is a basic HTTP server example." }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Run with: node Basic_Server.js
