# 01 - Node.js Basics & Architecture

## What is Node.js?
Node.js is an open-source, cross-platform JavaScript runtime environment. It executes JavaScript code outside a web browser, typically on the server.

## The V8 Engine
Node.js is built on Google Chrome's V8 JavaScript Engine. The V8 engine compiles JavaScript code into native machine code instead of interpreting it in real-time or executing it as bytecode, resulting in very fast execution.

## Libuv & Asynchronous I/O
Libuv is a multi-platform C library that provides support for asynchronous I/O based on event loops. It abstracts non-blocking I/O operations and manages:
- **The Event Loop**
- **Thread Pool** (Default 4 threads, used for heavy tasks like File System, Crypto, DNS lookups)

## Single-Threaded Event Loop Model
Node.js uses a single-threaded model with event looping.
1. Clients send requests to the Web Server.
2. Node.js Web Server internally maintains a Limited Thread pool to provide services to the Client Requests.
3. Node.js Web Server receives these requests and places them into a Queue. It is known as "Event Queue".
4. Node.js Web Server internally has a Component, known as "Event Loop". Why it got this name is that it uses an indefinite loop to receive requests and process them.

## When to use Node.js?
- I/O bound Applications
- Data Streaming Applications
- Data Intensive Real-time Applications (DIRT)
- JSON APIs based Applications
- Single Page Applications

## When NOT to use Node.js?
- CPU Intensive Applications (e.g., Heavy video encoding, complex image processing). Because it is single-threaded, a heavy CPU-bound task will block the event loop.
