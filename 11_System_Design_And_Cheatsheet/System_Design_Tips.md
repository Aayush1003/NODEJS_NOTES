# Node.js System Design & Best Practices

When designing scalable backend architectures using Node.js, you must account for its single-threaded nature. Here are the ultimate tips and concepts for System Design using Node.

## 1. Scaling Node.js Applications
Since Node.js runs on a single thread, deploying it on a multi-core server (e.g., an 8-core machine) means it will only use 1 core by default. 
*   **Vertical Scaling (Scaling Up):** Use the built-in `cluster` module or a process manager like **PM2** (`pm2 start app.js -i max`). PM2 will spawn a Node.js process for every CPU core available and load-balance incoming traffic among them.
*   **Horizontal Scaling (Scaling Out):** Run multiple Node.js instances across different machines (or Docker containers/Kubernetes pods) and put a **Load Balancer** (like NGINX, HAProxy, or AWS ALB) in front of them to distribute traffic.

## 2. Dealing with Heavy Computations
Never block the Event Loop! If you have heavy CPU-bound tasks (e.g., video rendering, complex cryptography, machine learning):
*   **Worker Threads:** Use the `worker_threads` module to execute JavaScript in parallel on different threads.
*   **Microservices:** Extract the heavy task into a separate microservice written in a language better suited for CPU-bound tasks (like Go, Rust, or Python) or a separate Node.js service altogether.

## 3. Caching for High Performance
To handle massive traffic, you shouldn't hit your database for every request.
*   **Redis:** Implement a Redis cache. 
    - *Pattern:* Check Redis first. If the data is there (Cache Hit), return it instantly. If not (Cache Miss), query the database, save the result to Redis, and then return it.
*   **In-Memory Caching:** Use `node-cache` for very simple, localized caching (not recommended for distributed systems as state isn't shared across clusters).

## 4. Message Queues (Asynchronous Processing)
If a user triggers an action that takes a long time (e.g., generating a PDF report or sending 10,000 emails), don't make them wait on the HTTP request.
*   **Implementation:** Use Message Brokers like **RabbitMQ**, **Apache Kafka**, or **AWS SQS**.
*   **Flow:** 
    1. User hits endpoint `/generate-report`.
    2. Node.js server immediately responds with `202 Accepted` ("We are working on it").
    3. The server pushes a message to RabbitMQ.
    4. A separate background worker (another Node.js process) consumes the message from the queue, generates the PDF, and sends an email to the user when done.

## 5. Database Connections
*   **Connection Pooling:** Always use connection pooling (supported natively by `pg`, `mongoose`, `sequelize`). Creating a new database connection for every request is extremely expensive. A pool keeps a set of connections open and reuses them.

## 6. Stateless Architecture
For horizontal scaling to work behind a load balancer, your Node.js app **must be stateless**.
*   **Sessions:** Do not store session data in memory (`req.session`). Use **Redis** to store sessions, or use **JWT (JSON Web Tokens)** which are inherently stateless.
*   **File Uploads:** Don't save user avatars or files to the local disk of the Node.js server. Upload them directly to object storage like **AWS S3** or Google Cloud Storage.

## 7. Security Best Practices
*   Use `helmet` middleware to set secure HTTP headers.
*   Use `cors` to restrict which domains can talk to your API.
*   Use `express-rate-limit` to prevent DDoS and brute-force attacks.
*   Sanitize all user inputs to prevent SQL Injection and XSS (Cross-Site Scripting).
