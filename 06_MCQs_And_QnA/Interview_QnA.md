# Node.js Interview Questions & Answers

### 1. What is Callback Hell and how do you avoid it?
**Answer:**
Callback Hell (or Pyramid of Doom) refers to heavily nested callbacks that make code hard to read and maintain.
*Avoid it by:*
- Using **Promises** (`.then().catch()`).
- Using **async/await** syntax (cleanest approach).
- Modularizing code (breaking callbacks into named functions).

### 2. Differentiate between `process.nextTick()` and `setImmediate()`.
**Answer:**
- `process.nextTick()`: Fires immediately on the same phase of the event loop. It executes before the event loop continues.
- `setImmediate()`: Fires on the following iteration or 'tick' of the event loop, specifically in the **Check** phase.

### 3. What is the purpose of `module.exports`?
**Answer:**
It is an object included in every JavaScript file in the Node.js application by default. It encapsulates the code in a single file and allows you to expose specific variables, functions, or classes to be required/imported by other files using `require()`.

### 4. How does Node.js handle concurrency if it is single-threaded?
**Answer:**
Node.js is single-threaded for JS execution, but it achieves concurrency through its asynchronous, non-blocking I/O model and the **Event Loop**. When an I/O operation (like file reading or DB query) is called, Node.js delegates it to the OS or the Libuv thread pool. The main thread continues executing other code. Once the I/O operation finishes, its callback is pushed to the Event Queue and executed by the Event Loop.

### 5. What are Streams in Node.js?
**Answer:**
Streams are objects that let you read data from a source or write data to a destination in continuous fashion (in chunks), rather than loading everything into memory at once. They are highly memory-efficient.
Types: Readable, Writable, Duplex, Transform.

### 6. Explain the concept of Middleware in Express.js.
**Answer:**
Middleware functions sit between the incoming request and the final route handler. They can:
- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack using `next()`.

### 7. What is the use of `.env` files?
**Answer:**
They are used to store environment variables (like Database URIs, API keys, Ports). This keeps sensitive information out of the source code and allows different configurations for different environments (Development, Testing, Production). Usually loaded using the `dotenv` package.
