#  Node.js Preparation Guide

This guide is tailored for clearing the Node.js track in the TCS Wings 1 assessment. It focuses on core concepts, tricky theoretical points often asked in MCQs, and practical patterns for coding assessments.

---

## 1. Node.js Core Architecture

Node.js is not a framework or a language; it is a **JavaScript runtime environment** built on Chrome's V8 JavaScript engine.

### Key Characteristics:
*   **Asynchronous & Event-Driven:** All APIs of the Node.js library are asynchronous (non-blocking). It essentially means a Node.js based server never waits for an API to return data.
*   **Single-Threaded but Highly Scalable:** Node.js uses a single thread model with event looping. This single thread handles multiple requests using non-blocking I/O calls.
*   **No Buffering:** Node.js applications never buffer any data. These applications simply output the data in chunks (Streams).
*   **Cross-Platform:** Works on Windows, Linux, Unix, Mac OS X, etc.

### Internal Components:
*   **V8 Engine:** Google's open-source high-performance JavaScript and WebAssembly engine, written in C++. It compiles JS code to machine code.
*   **Libuv:** A multi-platform C library that provides support for asynchronous I/O based on event loops. It abstracts non-blocking I/O operations and handles the **Event Loop**, **Thread Pool**, and file system tasks.

---

## 2. The Event Loop (Crucial for MCQs)

The Event Loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded.

### Phases of the Event Loop:
1.  **Timers:** Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
2.  **Pending Callbacks:** Executes I/O callbacks deferred to the next loop iteration.
3.  **Idle, Prepare:** Only used internally.
4.  **Poll:** Retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and `setImmediate()`); node will block here when appropriate.
5.  **Check:** `setImmediate()` callbacks are invoked here.
6.  **Close Callbacks:** Some close callbacks, e.g., `socket.on('close', ...)`.

**Tricky Concept:** `process.nextTick()` vs `setImmediate()`
*   `process.nextTick()` fires **immediately on the same phase**, before the event loop continues to the next phase. It has the highest priority.
*   `setImmediate()` fires on the following iteration or 'tick' of the event loop (Check phase).

---

## 3. Modules and CommonJS

Node.js traditionally uses the **CommonJS** module system (though ES Modules `import/export` are now supported).

*   **`require()`**: Used to load modules. It is **synchronous**. It caches the module after the first load.
*   **`module.exports` vs `exports`**:
    *   `module.exports` is the actual object returned by `require()`.
    *   `exports` is just a reference (pointer) to `module.exports`.
    *   *Warning:* If you reassign `exports = {}`, it breaks the reference, and `module.exports` remains unchanged. Always use `module.exports` when exporting a single class or function.

### Module Wrapper Function
Under the hood, Node.js wraps every file inside a function before execution. This is why variables aren't global by default.
```javascript
(function(exports, require, module, __filename, __dirname) {
    // Your module code actually lives here
});
```

---

## 4. Built-in Core Modules

### A. `fs` (File System)
*   **Synchronous:** `fs.readFileSync()`, `fs.writeFileSync()` (Blocks the main thread. Avoid in server logic).
*   **Asynchronous:** `fs.readFile()`, `fs.writeFile()` (Uses callbacks).
*   **Promises API:** `fs.promises.readFile()` (Use with async/await).

### B. `path`
Used for handling and transforming file paths securely across different OS.
*   `path.join(__dirname, 'folder', 'file.txt')`: Joins segments.
*   `path.resolve('file.txt')`: Resolves to an absolute path.
*   `path.extname('index.html')`: Returns `.html`.

### C. `events` (EventEmitter)
Many Node.js core APIs are built around an idiomatic asynchronous event-driven architecture.
```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Listener
myEmitter.on('event', () => console.log('an event occurred!'));

// Emitter
myEmitter.emit('event');
```
*`myEmitter.once()`* triggers the listener only the very first time the event is emitted.

### D. `http`
Used to create a basic web server.
```javascript
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});
server.listen(3000);
```

---

## 5. Express.js (Often tested in Wings 1)

Express is a minimal and flexible Node.js web application framework.

### Middleware
Functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle (usually denoted by a variable named `next`).

**Types of Middleware:**
1.  **Application-level:** `app.use((req, res, next) => { ... })`
2.  **Router-level:** `router.use(...)`
3.  **Error-handling:** Takes 4 arguments instead of 3. `app.use((err, req, res, next) => { ... })`
4.  **Built-in:** `express.json()`, `express.urlencoded()`, `express.static()`
5.  **Third-party:** `helmet`, `cors`, `morgan`

### Routing
```javascript
app.get('/', (req, res) => { res.send('GET request'); });
app.post('/', (req, res) => { res.send('POST request'); });

// Route Parameters
app.get('/users/:userId', (req, res) => {
    console.log(req.params.userId); 
});
```

---

## 6. NPM and `package.json`

*   **`package.json`**: Holds metadata relevant to the project and used for managing dependencies, scripts, versions.
*   **Dependencies vs DevDependencies**:
    *   `dependencies` (installed via `npm i <pkg>`): Required for the application to run in production (e.g., `express`, `mongoose`).
    *   `devDependencies` (installed via `npm i -D <pkg>`): Only needed for local development and testing (e.g., `jest`, `nodemon`).
*   **`package-lock.json`**: Automatically generated. It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.
*   **Semantic Versioning (SemVer):** `MAJOR.MINOR.PATCH` (e.g., `1.4.2`)
    *   `^1.4.2`: Allows minor and patch updates (1.x.x)
    *   `~1.4.2`: Allows only patch updates (1.4.x)
    *   `1.4.2`: Exact version.

---

## 7. Streams and Buffers

*   **Buffer:** A temporary memory spot used to gather some data while it's being moved from one place to another (especially relevant for binary data).
*   **Streams:** Collections of data that might not be available all at once and don't have to fit in memory. Good for handling large files.
    *   **Readable:** Read data (e.g., `fs.createReadStream()`).
    *   **Writable:** Write data (e.g., `fs.createWriteStream()`).
    *   **Duplex:** Both Readable and Writable (e.g., TCP socket).
    *   **Transform:** Duplex stream that can modify data as it is written and read (e.g., `zlib.createGzip()`).

---

## 8. Environment Variables and Process

*   **`process.env`**: Used to access environment variables.
*   Best practice is to use the `dotenv` package to load variables from a `.env` file into `process.env`.
*   **`process.exit()`**: Exits the process. `process.exit(1)` indicates failure, `0` indicates success.
*   **`__dirname`**: Absolute path of the directory containing the currently executing file.
*   **`__filename`**: Absolute path of the currently executing file.

---

## 9. Important MCQ Pointers for Wings 1

1.  **Is Node.js completely single-threaded?** No. The V8 Javascript execution is single-threaded, but the I/O operations managed by Libuv use a thread pool (default size is 4) to handle file system, DNS lookups, etc.
2.  **What does `require()` return?** It returns the `module.exports` object from the requested module.
3.  **Callback Hell (Pyramid of Doom):** Heavily nested callbacks that make code difficult to read. Solved by using Promises and `async/await`.
4.  **CORS:** Cross-Origin Resource Sharing. A mechanism to allow restricted resources on a web page to be requested from another domain. Enabled in Express via the `cors` middleware.
5.  **Event Emitter Memory Leaks:** Emitting events without handling them doesn't cause leaks, but attaching too many listeners to a single event does. Node warns if more than 10 listeners are added to an event.

## 10. Sample Coding/Hands-on Scenarios
*   Create an Express server with routes supporting GET, POST, PUT, DELETE.
*   Read a file asynchronously, transform its contents, and write to a new file using the `fs` module.
*   Create a custom Event Emitter and trigger it.
*   Implement basic error handling middleware in Express.
