# 02 - Modules and NPM

## CommonJS vs ES Modules

### CommonJS (Default in Node.js traditionally)
- Uses `require()` for importing.
- Uses `module.exports` or `exports` for exporting.
- Loading is **Synchronous**.

```javascript
// Exporting (math.js)
const add = (a, b) => a + b;
module.exports = { add };

// Importing (app.js)
const math = require('./math');
console.log(math.add(2, 3));
```

### ES Modules (Modern JavaScript)
- Uses `import` for importing.
- Uses `export` for exporting.
- Loading is **Asynchronous**.
- To use in Node.js, you need `"type": "module"` in `package.json` or use `.mjs` extension.

```javascript
// Exporting (math.mjs)
export const add = (a, b) => a + b;

// Importing (app.mjs)
import { add } from './math.mjs';
console.log(add(2, 3));
```

## Core Modules
Node.js has several modules compiled into the binary.
- **`fs`**: File system operations.
- **`path`**: Utilities for working with file and directory paths.
- **`http` / `https`**: To create HTTP servers and make HTTP requests.
- **`events`**: Much of the Node.js core API is built around an idiomatic asynchronous event-driven architecture.
- **`os`**: Operating system-related utility methods.
- **`crypto`**: Cryptographic functionality (hashes, HMAC, ciphers).

## NPM (Node Package Manager)
- **`package.json`**: The manifest file for your project. Contains metadata, dependencies, and scripts.
- **`dependencies`**: Packages required for the application to run (e.g., express).
- **`devDependencies`**: Packages required only for development (e.g., nodemon, jest).
- **`npm install`**: Installs dependencies.
- **`npm install -g`**: Installs packages globally on your system.
