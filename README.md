# YouTube LAN Remote Control

A simple web-based remote to play and manage a YouTube video on a laptop from a phone over the same local network.

## Features

- Load any YouTube video by URL or ID from the mobile remote
- Play, pause, seek, and adjust volume
- Mute/unmute
- Toggle fullscreen on the player
- Near real-time control via WebSockets
- No installation — runs entirely in the browser

## Technology stack

- Frontend: HTML, CSS, JavaScript (YouTube IFrame Player API)
- Backend: Node.js + Express.js (serves files)
- Real-time: WebSockets

## Setup & usage

### Prerequisite

- Node.js installed on the laptop that will play the video.

### 1. Project files

Place all project files (`server.js`, `package.json`, `player.html`, `remote.html`, etc.) into a single folder on the laptop.

### 2. Install dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 3. Find your laptop's local IP

You will use this IP on your phone to connect.

- Windows: `ipconfig` → look for "IPv4 Address"
- macOS: `ifconfig | grep "inet "` → choose the non-127.0.0.1 address
- Linux: `hostname -I`

### 4. Start the server

In the project folder run:

```bash
npm start
```

You should see a message like `Server is listening on port 3000`.

### 5. Open player and remote

- On the laptop (player): open a browser to:

```text
http://localhost:3000
```

- On the phone (remote): connect the phone to the same Wi‑Fi and open:

```text
http://<YOUR_LAPTOP_IP>:3000/remote.html
```

Replace `<YOUR_LAPTOP_IP>` with the IP from step 3.

## Troubleshooting

- Remote/player won't load:
  - Ensure both devices are on the same Wi‑Fi and the IP is correct.
  - Check the laptop firewall (try temporarily disabling to test).
- Code changes not visible:
  - Perform a hard refresh (Ctrl+Shift+R) or clear the browser cache.
- Video starts muted and cannot be unmuted remotely:
  - Browser security may block autoplay audio. Click anywhere on the player page once on the laptop to enable audio and fullscreen controls from the remote.

## Packaging for a new laptop

1. Copy the entire project folder to the new laptop (USB, network, etc.).
2. Install Node.js if needed.
3. In the project folder run:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

Then follow the usage steps above.

You can now control the laptop YouTube player from your phone over the LAN.
