# YouTube Remote — Signaling Server

A small WebSocket signaling server (Node.js) that acts as the real-time communication hub between the mobile remote and the laptop player.

## Prerequisites

- Node.js installed (v12+ recommended)
- The project uses the `ws` library (declared in `package.json`)

## Install

From the `server` directory, run:

```bash
npm install
```

## Start the server

Run:

```bash
npm start
```

You should see a confirmation message like:

```
[Server] Starting WebSocket server on port 8080...
```

By default the server listens on port `8080`. If your project supports a different port via an environment variable (for example `PORT`), set that before starting the server:

```bash
PORT=3000 npm start
```

## Usage

- Connect the laptop player and the mobile remote to the server WebSocket URL (e.g. `ws://<host>:8080`).
- The server relays signaling messages between connected clients.

## Next

Implement the player page for the laptop and the remote UI for the mobile device to exchange WebRTC or control messages via this signaling server.
