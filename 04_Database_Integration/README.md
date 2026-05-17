# 04 - Database Integration

Node.js is frequently used with both NoSQL (MongoDB) and SQL (PostgreSQL, MySQL) databases.

## 1. MongoDB with Mongoose
MongoDB is a NoSQL, document-oriented database. Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.

### Setup and Connection
```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err));
```

### Defining a Schema and Model
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

### Basic CRUD Operations
```javascript
// Create
const newUser = new User({ name: 'Alice', email: 'alice@example.com' });
await newUser.save();

// Read
const users = await User.find({ age: { $gte: 18 } });

// Update
await User.updateOne({ name: 'Alice' }, { age: 25 });

// Delete
await User.deleteOne({ name: 'Alice' });
```

## 2. SQL with Sequelize (Optional)
Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.

```javascript
const { Sequelize, DataTypes } = require('sequelize');

// Connection
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Model
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  birthday: { type: DataTypes.DATE }
});

// Sync and Create
await sequelize.sync();
const jane = await User.create({ username: 'janedoe', birthday: new Date(1980, 6, 20) });
```
