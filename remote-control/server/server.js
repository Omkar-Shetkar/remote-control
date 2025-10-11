// Import the WebSocket library
const { WebSocketServer } = require("ws");

// Define the port number the server will listen on
const PORT = 8080;

// Create a new WebSocket server instance
const wss = new WebSocketServer({ port: PORT });

console.log(`[Server] Starting WebSocket server on port ${PORT}...`);

// This event listener is triggered whenever a new client connects
wss.on("connection", (ws) => {
  console.log("[Server] A new client has connected.");

  // This event listener is triggered when a message is received from a client
  ws.on("message", (message) => {
    console.log(`[Server] Received message: ${message}`);

    // Broadcast the received message to all other connected clients
    wss.clients.forEach((client) => {
      // Check if the client is not the one who sent the message and is ready to receive messages
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(message.toString());
        console.log(`[Server] Relayed message to a client.`);
      }
    });
  });

  // This event listener is triggered when a client disconnects
  ws.on("close", () => {
    console.log("[Server] A client has disconnected.");
  });

  // Handle any potential errors
  ws.on("error", (error) => {
    console.error("[Server] An error occurred:", error);
  });
});
