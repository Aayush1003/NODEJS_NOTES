# 05 - Advanced Node.js

## 1. Streams
Streams are collections of data that might not be available all at once and don't have to fit in memory. This makes them powerful for dealing with large amounts of data, like reading a large file or streaming video.

Types of streams:
- **Readable:** Stream you can read from (e.g., `fs.createReadStream()`).
- **Writable:** Stream you can write to (e.g., `fs.createWriteStream()`).
- **Duplex:** Stream that is both Readable and Writable (e.g., `net.Socket`).
- **Transform:** A type of Duplex stream where the output is computed based on the input (e.g., `zlib.createDeflate()`).

```javascript
// Piping a readable stream to a writable stream
const fs = require('fs');
const readableStream = fs.createReadStream('input.txt');
const writableStream = fs.createWriteStream('output.txt');

readableStream.pipe(writableStream);
```

## 2. Event Emitters
Node.js core modules heavily rely on the Observer pattern using Event Emitters.
```javascript
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', (data) => {
  console.log('an event occurred!', data);
});

myEmitter.emit('event', { id: 1 });
```

## 3. Worker Threads (Multithreading in Node.js)
While Node.js event loop is single-threaded, `worker_threads` allows you to execute JavaScript in parallel, useful for CPU-intensive tasks.

```javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', msg => console.log('Message from worker:', msg));
} else {
  // Heavy CPU task here
  parentPort.postMessage('Hello from Worker Thread!');
}
```

## 4. Cluster Module
A single instance of Node.js runs in a single thread. To take advantage of multi-core systems, the user will sometimes want to launch a cluster of Node.js processes to handle the load.

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork(); // Spawn worker
  }
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);
}
```
