# 02 - WebSocket Mastery: The Ultimate Guide

## 1. The Problem with HTTP for Real-Time Apps
HTTP is a strictly **unidirectional** and **half-duplex** protocol. The client must *always* initiate the request, and the server can only respond. The server cannot send data to the client unprompted.

Before WebSockets, developers used hacks for real-time data (like chat apps or live stock prices):
1.  **Short Polling:** The client asks the server for new data every X seconds. (Very resource-intensive, lots of empty responses).
2.  **Long Polling:** The client requests data. The server holds the request open until new data is available, sends it, and the client immediately makes a new request. (Better, but still has HTTP overhead on every connection).

---

## 2. What is a WebSocket?
WebSocket is a distinct TCP-based protocol (`ws://` and `wss://`) that provides **full-duplex, bidirectional** communication channels over a single, long-lived connection.

### Key Features:
*   **Persistent Connection:** The connection stays open until the client or server explicitly closes it.
*   **Bidirectional:** Both the client and server can send messages to each other independently at any time.
*   **Low Overhead:** Once the connection is established, data frames have very little header overhead compared to HTTP, making it incredibly fast and efficient.

---

## 3. The WebSocket Handshake (How it starts)
WebSockets actually start as a standard HTTP request!
1.  The client sends an HTTP `GET` request to the server with an `Upgrade: websocket` header.
2.  If the server supports WebSockets, it responds with an HTTP `101 Switching Protocols` status code.
3.  The HTTP connection is "upgraded", replaced by the WebSocket protocol over the same underlying TCP/IP connection.

---

## 4. WebSockets in Node.js

Node.js does not have built-in WebSocket support in its standard library (unlike `http`). We rely on third-party libraries. The two most famous are:
1.  `ws`: A barebones, blazing fast, native WebSocket implementation.
2.  `socket.io`: A higher-level library that wraps WebSockets, provides fallbacks (like long-polling if WS fails), and adds features like rooms and broadcasting.

### Example 1: Pure WebSocket using `ws` package

**Server (`npm i ws`)**
```javascript
const WebSocket = require('ws');

// Start WS server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected!');

    // Listen for messages from this client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        
        // Echo the message back to the client
        ws.send(`Server says: You said "${message}"`);
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
```

**Client (Browser JavaScript)**
```javascript
// Connect to the WebSocket server
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', (event) => {
    console.log('Message from server: ', event.data);
});
```

### Example 2: Using `socket.io` (Recommended for complex apps)
`socket.io` makes broadcasting (sending to everyone) and rooms (sending to a specific group) incredibly easy.

**Server (`npm i socket.io`)**
```javascript
const io = require('socket.io')(3000, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // 1. Emitting to just this socket
  socket.emit('welcome', 'Welcome to the server!');

  // 2. Broadcasting (to everyone EXCEPT this socket)
  socket.broadcast.emit('new_user', 'A new user joined the chat');

  // 3. Joining a room
  socket.join('gaming_room');

  // 4. Emitting to a specific room
  io.to('gaming_room').emit('room_msg', 'Hello Gamers!');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
```
