# 03 - Express.js Mastery

Express is a fast, unopinionated, minimalist web framework for Node.js.

## Basic Server Setup
```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

## Middleware
Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle.

### Types of Middleware:
1. **Application-level middleware**: Bound to an instance of the `app` object by using `app.use()` and `app.METHOD()`.
2. **Router-level middleware**: Bound to an instance of `express.Router()`.
3. **Error-handling middleware**: Always takes *four* arguments: `(err, req, res, next)`.
4. **Built-in middleware**: `express.static`, `express.json`, `express.urlencoded`.
5. **Third-party middleware**: `body-parser`, `cors`, `helmet`, `morgan`.

### Example of Custom Middleware:
```javascript
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next(); // Pass control to the next middleware function
};

app.use(logger); // Applies to all routes below it
```

## Routing and Parameters
```javascript
// Route Parameter
app.get('/users/:userId', (req, res) => {
    res.send(`User ID: ${req.params.userId}`);
});

// Query String
// Request: /search?keyword=node
app.get('/search', (req, res) => {
    res.send(`Search for: ${req.query.keyword}`);
});
```
