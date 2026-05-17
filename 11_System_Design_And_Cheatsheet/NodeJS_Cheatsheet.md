# Node.js Ultimate Cheat Sheet

## 1. Global Objects & Environment
```javascript
__dirname  // Path to current directory
__filename // Path to current file
process.env // Access environment variables (e.g., process.env.PORT)
process.argv // Array of command line arguments
process.exit(1) // Exit with failure code
```

## 2. CommonJS Modules
```javascript
// Exporting
module.exports = { myFunction };
module.exports = class MyClass {};

// Importing
const { myFunction } = require('./myModule');
const fs = require('fs'); // Core module
```

## 3. ES Modules (Requires "type": "module" in package.json)
```javascript
// Exporting
export const myFunction = () => {};
export default class MyClass {};

// Importing
import { myFunction } from './myModule.js';
import MyClass from './MyClass.js';
```

## 4. File System (`fs` with Promises)
```javascript
const fs = require('fs/promises');

// Read
const data = await fs.readFile('file.txt', 'utf8');

// Write (overwrites)
await fs.writeFile('file.txt', 'Hello World');

// Append
await fs.appendFile('file.txt', '\nNew Line');
```

## 5. Express.js Quick Setup
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files

// Routing
app.get('/api/users', (req, res) => res.json(users));
app.post('/api/users', (req, res) => res.status(201).send('Created'));
app.get('/api/users/:id', (req, res) => res.send(`ID: ${req.params.id}`));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Server ready'));
```

## 6. Events (EventEmitter)
```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Listen
emitter.on('userLoggedIn', (user) => console.log(user));

// Trigger
emitter.emit('userLoggedIn', { id: 1, name: 'Alice' });
```

## 7. NPM Commands
```bash
npm init -y          # Create package.json instantly
npm i <pkg>          # Install package for production
npm i -D <pkg>       # Install package as dev dependency
npm uninstall <pkg>  # Remove package
npm run <script>     # Run a script defined in package.json
```
