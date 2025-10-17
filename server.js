const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const os = require("os");

const PORT = process.env.PORT || 3000;

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    // Prioritize wireless interfaces
    if (
      name.toLowerCase().includes("wi-fi") ||
      name.toLowerCase().includes("wlan")
    ) {
      for (const iface of interfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
  }
  // Fallback to any non-internal IPv4
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1";
}

function start() {
  return new Promise((resolve, reject) => {
    const app = express();
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server });

    app.use(express.static(path.join(__dirname)));

    const players = new Set();
    const remotes = new Set();

    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        try {
          const data = JSON.parse(message);

          if (data.type === "identify") {
            if (data.clientType === "player") {
              players.add(ws);
              const remoteUrl = `http://${getLocalIp()}:${PORT}/remote.html`;
              ws.send(JSON.stringify({ type: "serverInfo", remoteUrl }));
            } else if (data.clientType === "remote") {
              remotes.add(ws);
            }
          }

          if (remotes.has(ws) && data.type === "command") {
            players.forEach((player) => player.send(JSON.stringify(data)));
          } else if (players.has(ws) && data.type === "stateUpdate") {
            remotes.forEach((remote) => remote.send(JSON.stringify(data)));
          }
        } catch (e) {
          console.error("Failed to process message:", e);
        }
      });

      ws.on("close", () => {
        players.delete(ws);
        remotes.delete(ws);
      });
    });

    server.listen(PORT, () => {
      const serverUrl = `http://${getLocalIp()}:${PORT}`;
      console.log(`Server is running at ${serverUrl}`);
      resolve({ instance: { server, wss }, url: serverUrl });
    });

    server.on("error", (err) => {
      reject(err);
    });
  });
}

function stop(instance) {
  return new Promise((resolve, reject) => {
    if (!instance) return resolve();
    const { server, wss } = instance;

    wss.clients.forEach((client) => client.close());

    wss.close((err) => {
      if (err) return reject(err);
      server.close((err) => {
        if (err) return reject(err);
        console.log("Server stopped.");
        resolve();
      });
    });
  });
}

module.exports = { start, stop };
