const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const os = require("os"); // Import the 'os' module to get network info

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// --- Helper function to get the local IP address ---
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost"; // Fallback
}

app.use(express.static(path.join(__dirname)));

const players = new Set();
const remotes = new Set();

wss.on("connection", (ws) => {
  console.log("A new client connected.");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      // 1. Identify and sort the client
      if (data.type === "identify") {
        if (data.clientType === "player") {
          console.log("Player client identified.");
          players.add(ws);

          // --- NEW: Send server info with remote URL to the player ---
          const remoteUrl = `http://${getLocalIpAddress()}:${PORT}/remote.html`;
          ws.send(JSON.stringify({ type: "serverInfo", remoteUrl: remoteUrl }));
        } else if (data.clientType === "remote") {
          console.log("Remote client identified.");
          remotes.add(ws);
        }
        return;
      }

      // 2. Relay messages based on client type
      if (remotes.has(ws) && data.type === "command") {
        // Message from a remote: forward to all players
        players.forEach((player) => {
          if (player.readyState === WebSocket.OPEN) {
            player.send(JSON.stringify(data));
          }
        });
      } else if (players.has(ws) && data.type === "stateUpdate") {
        // Message from a player: forward to all remotes
        remotes.forEach((remote) => {
          if (remote.readyState === WebSocket.OPEN) {
            remote.send(JSON.stringify(data));
          }
        });
      }
    } catch (error) {
      console.error("Failed to process message:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
    // Remove from the sets upon disconnection
    players.delete(ws);
    remotes.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

server.listen(PORT, () => {
  const ipAddress = getLocalIpAddress();
  console.log(`\n--- YouTube Remote Server is running ---`);
  console.log(`\n[PLAYER] Open this on your Laptop/Desktop:`);
  console.log(`         http://localhost:${PORT}/player.html`);
  console.log(`\n[REMOTE] Open this on your Mobile Phone:`);
  console.log(`         http://${ipAddress}:${PORT}/remote.html\n`);
});
