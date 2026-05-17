# 09 - PostgreSQL Guide

PostgreSQL (or Postgres) is a powerful, open-source object-relational database system known for reliability, feature robustness, and performance.

## Relational Database Concepts
- **Tables:** Where data is stored.
- **Rows:** Individual records.
- **Columns:** Attributes of the records.
- **Primary Key:** A unique identifier for a row.
- **Foreign Key:** A column that establishes a link between data in two tables.

## Basic SQL Commands

### 1. DDL (Data Definition Language)
Used to define the database schema.
```sql
-- Create Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alter Table
ALTER TABLE users ADD COLUMN age INT;

-- Drop Table
DROP TABLE users;
```

### 2. DML (Data Manipulation Language)
Used to manipulate data within tables.
```sql
-- Insert
INSERT INTO users (username, email) VALUES ('alice', 'alice@example.com');

-- Select
SELECT id, username FROM users WHERE age > 18 ORDER BY created_at DESC;

-- Update
UPDATE users SET age = 25 WHERE username = 'alice';

-- Delete
DELETE FROM users WHERE username = 'alice';
```

## Joins
Combining rows from two or more tables based on a related column.
```sql
SELECT orders.order_id, users.username 
FROM orders
INNER JOIN users ON orders.user_id = users.id;
```

## Connecting Postgres to Node.js/NestJS

### 1. Using Node.js with `pg` (node-postgres)
```javascript
const { Client } = require('pg');
const client = new Client({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 5432,
});
await client.connect();
const res = await client.query('SELECT $1::text as message', ['Hello world!']);
console.log(res.rows[0].message);
await client.end();
```

### 2. Using NestJS with TypeORM
TypeORM is highly integrated with NestJS and uses TypeScript decorators.

```typescript
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
```

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'pgpassword',
      database: 'testdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Only for development!
    }),
  ],
})
export class AppModule {}
```
