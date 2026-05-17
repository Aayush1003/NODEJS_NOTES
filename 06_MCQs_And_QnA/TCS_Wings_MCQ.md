# Node.js Multiple Choice Questions (MCQs) for TCS Wings 1 & Assessments

### Q1. Which of the following is true about Node.js?
- [ ] A) Node.js is a client-side framework.
- [x] B) Node.js is built on Google Chrome's V8 engine.
- [ ] C) Node.js uses a multi-threaded blocking I/O model.
- [ ] D) Node.js requires Java to run.
**Explanation:** Node.js uses a single-threaded non-blocking I/O model and runs on Chrome's V8 engine.

### Q2. How can we expose a function or object from a module in CommonJS?
- [ ] A) `export.module`
- [ ] B) `module.expose`
- [x] C) `module.exports`
- [ ] D) `exports.module`
**Explanation:** `module.exports` is used to expose objects, functions, or variables to be used in other files.

### Q3. Which core module is used to create a web server in Node.js?
- [ ] A) `web`
- [ ] B) `url`
- [x] C) `http`
- [ ] D) `server`
**Explanation:** The `http` module contains the `createServer()` method to spin up a server.

### Q4. What is the default scope of a variable in a Node.js module?
- [ ] A) Global
- [x] B) Local to the module
- [ ] C) Application-wide
- [ ] D) Window
**Explanation:** By default, variables declared in a module are scoped only to that module thanks to the Module Wrapper Function.

### Q5. What is the purpose of the `process.nextTick()` function?
- [ ] A) To delay execution by a specific number of milliseconds.
- [ ] B) To execute a callback immediately after the current event loop phase finishes, but before moving to the next phase.
- [x] C) To defer the execution of a function until the next iteration of the Event Loop, before any I/O events are fired.
- [ ] D) To stop the Node.js process.
**Explanation:** `process.nextTick()` puts the callback at the front of the queue, executing it immediately after the current operation completes, before the event loop continues.

### Q6. Which stream is used to read data from a source?
- [x] A) Readable
- [ ] B) Writable
- [ ] C) Duplex
- [ ] D) Transform

### Q7. What is `package-lock.json` used for?
- [ ] A) To lock the code so no one can edit it.
- [x] B) To store the exact version tree of dependencies installed, ensuring consistent installs across machines.
- [ ] C) To define the scripts to run the application.
- [ ] D) To store global npm packages.

### Q8. In Express.js, how do you handle an error globally?
- [ ] A) `app.on('error', cb)`
- [x] B) `app.use((err, req, res, next) => {})`
- [ ] C) `app.catch(cb)`
- [ ] D) `app.error((req, res) => {})`
**Explanation:** Error handling middleware in Express takes 4 arguments. The first one is the error object.
