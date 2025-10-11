const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Store clients by type
const players = new Set();
const remotes = new Set();

wss.on("connection", (ws) => {
  console.log("A client connected");

  ws.on("message", (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch (e) {
      console.error("Invalid JSON received:", message);
      return;
    }

    // 1. Handle client identification
    if (data.type === "identify") {
      if (data.clientType === "player") {
        console.log("Player client identified");
        players.add(ws);
      } else if (data.clientType === "remote") {
        console.log("Remote client identified");
        remotes.add(ws);
      }
      return;
    }

    // 2. Route messages based on client type
    if (remotes.has(ws) && data.type === "command") {
      // Message from a remote: forward to all players
      console.log("Command from remote:", data.command);
      players.forEach((player) => {
        if (player.readyState === WebSocket.OPEN) {
          player.send(JSON.stringify(data));
        }
      });
    } else if (players.has(ws) && data.type === "stateUpdate") {
      // Message from a player: forward to all remotes
      // console.log('State update from player:', data.state); // Can be noisy, uncomment for debugging
      remotes.forEach((remote) => {
        if (remote.readyState === WebSocket.OPEN) {
          remote.send(JSON.stringify(data));
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("A client disconnected");
    // Remove the client from the sets when they disconnect
    players.delete(ws);
    remotes.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Open http://localhost:${PORT}/player.html on your laptop.`);
  console.log(
    `Open http://<your-laptop-ip>:${PORT}/remote.html on your phone.`
  );
});
