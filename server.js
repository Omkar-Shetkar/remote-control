// Import necessary libraries
const { WebSocketServer } = require("ws");
const express = require("express");
const http = require("http");
const path = require("path");

// Define the port number
const PORT = 8080;

// Create an Express app to serve our HTML files
const app = express();

// Serve static files (like remote.html and player.html) from the current directory
app.use(express.static(path.join(__dirname)));

// Create a standard HTTP server using the Express app
const server = http.createServer(app);

// Create a new WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server });

console.log(`[Server] Starting HTTP and WebSocket server on port ${PORT}...`);
console.log(`[Server] Player page: http://localhost:${PORT}/player.html`);
console.log(`[Server] Remote page: http://<your-ip>:${PORT}/remote.html`);

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("[Server] A new client has connected.");

  // Relay messages to other clients
  ws.on("message", (message) => {
    console.log(`[Server] Received message: ${message}`);
    // Broadcast the message to all other connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(message.toString());
        console.log(`[Server] Relayed message to a client.`);
      }
    });
  });

  // Handle disconnections
  ws.on("close", () => {
    console.log("[Server] A client has disconnected.");
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("[Server] An error occurred:", error);
  });
});

// Start the HTTP server, which also starts the WebSocket server
server.listen(PORT, () => {
  console.log(
    `[Server] Server is officially running and listening on port ${PORT}.`
  );
});
