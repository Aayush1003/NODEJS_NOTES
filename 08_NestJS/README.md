# 08 - NestJS Guide

NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript by default and is heavily inspired by Angular's architecture.

## Core Concepts

### 1. Modules (`@Module()`)
Modules are used to organize the application structure into cohesive blocks of functionality. Every Nest application has at least one module, the root module (`AppModule`).

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // Expose this service to other modules
})
export class UsersModule {}
```

### 2. Controllers (`@Controller()`)
Controllers are responsible for handling incoming HTTP requests and returning responses to the client.

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // Base route: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
```

### 3. Providers & Dependency Injection (`@Injectable()`)
Providers are plain JavaScript classes that are declared as providers in a module. The main idea is that they can inject dependencies. Services, repositories, factories, helpers are all providers.

```typescript
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
  }

  findOne(id: number): User {
    return this.users.find(u => u.id === id);
  }
}
```

### 4. Middleware
Functions that have access to the request and response objects, similar to Express middleware.

### 5. Exception Filters
Responsible for handling unhandled exceptions across the application and formatting the HTTP response.

### 6. Pipes
Used for **Transformation** (transform input data to desired form, e.g., string to integer) and **Validation** (evaluate input data and throw exception if invalid). Nest provides `ValidationPipe` out of the box which works beautifully with `class-validator`.

### 7. Guards
Determine whether a given request will be handled by the route handler or not (used heavily for Authorization/Authentication).

## Why NestJS over Express?
- **Opinionated Structure:** Enforces a clean, scalable architecture out of the box (Dependency Injection, Modules).
- **TypeScript First:** Built with and fully supports TypeScript.
- **Ecosystem:** Easy integration with ORMs (TypeORM, Prisma), GraphQL, WebSockets, and Microservices.
- **Testability:** The dependency injection system makes mocking and unit testing extremely easy.
