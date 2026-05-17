const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store
let users = [
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' }
];

// 1. CREATE (POST)
app.post('/api/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        role: req.body.role || 'User'
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 2. READ ALL (GET)
app.get('/api/users', (req, res) => {
    res.json(users);
});

// 3. READ ONE (GET)
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// 4. UPDATE (PUT)
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;
    res.json(user);
});

// 5. DELETE (DELETE)
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser[0]);
});

app.listen(PORT, () => {
    console.log(`Express CRUD API running on http://localhost:${PORT}`);
});

// Required packages to run this:
// npm init -y
// npm install express
// node Express_CRUD.js
