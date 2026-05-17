# 01 - HTTP (HyperText Transfer Protocol)

HTTP is the foundation of data communication for the World Wide Web. It is an application-layer protocol designed within the framework of the Internet Protocol Suite.

## How HTTP Works
HTTP functions as a **Request-Response** protocol in a client-server computing model.
1. **Client (Browser/App):** Submits an HTTP request message to the server.
2. **Server:** Returns a response message to the client (usually containing the requested HTML, JSON, or an error).

### Key Characteristics:
*   **Stateless:** Each request is executed independently, without any knowledge of the requests that were executed before it. (We use Cookies/Sessions/Tokens to maintain state).
*   **Connectionless:** Once a request is made, the client disconnects from the server. The server processes the request, re-establishes the connection, and sends the response. (HTTP/1.1 introduced persistent connections via `Keep-Alive`).

## HTTP Methods
*   **GET:** Retrieve data. (Should be safe and idempotent).
*   **POST:** Submit data to the server to create a new resource.
*   **PUT:** Update an existing resource entirely.
*   **PATCH:** Apply partial modifications to a resource.
*   **DELETE:** Delete a resource.

## HTTP Status Codes
*   **1xx (Informational):** Request received, continuing process.
*   **2xx (Successful):** 
    *   `200 OK`
    *   `201 Created`
*   **3xx (Redirection):**
    *   `301 Moved Permanently`
    *   `304 Not Modified`
*   **4xx (Client Error):**
    *   `400 Bad Request`
    *   `401 Unauthorized` (Authentication failed)
    *   `403 Forbidden` (Authenticated but doesn't have permissions)
    *   `404 Not Found`
*   **5xx (Server Error):**
    *   `500 Internal Server Error`
    *   `502 Bad Gateway`
