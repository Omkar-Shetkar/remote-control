# YouTube LAN Remote Control

A simple web-based remote to play and manage a YouTube video on a laptop using a mobile phone over the same local network.

## Features

- Load & play any YouTube video by URL or ID from the mobile remote.
- Full playback controls: play, pause, seek, adjust volume.
- Mute/unmute and toggle fullscreen.
- Real-time commands over WebSockets (near-zero latency).
- No installation — runs entirely in the browser.

## Technology stack

- Frontend: HTML, CSS, JavaScript (YouTube IFrame Player API)
- Backend: Node.js + Express
- Real-time: WebSockets

## Setup and usage

**Prerequisite:** Node.js installed on the laptop that will play the video.

1. Place project files  
   Put all files (`server.js`, `package.json`, `player.html`, `remote.html`, etc.) into a single folder on the laptop.

2. Install dependencies  
   Open a terminal in the project folder and run:

```
npm install
```

3. Find your laptop's local IP address

- Windows: `ipconfig` → look for "IPv4 Address" under active adapter.
- macOS: `ifconfig | grep "inet "` → pick the non-127.0.0.1 address.
- Linux: `hostname -I`

4. Start the server

```
npm start
```

You should see a message like: `Server is listening on port 3000`. Keep the terminal open.

5. Open the player and remote

- On the laptop (player): open `http://localhost:3000` in a browser.
- On the phone (remote, same Wi‑Fi): open `http://<YOUR_LAPTOP_IP>:3000/remote.html` (replace `<YOUR_LAPTOP_IP>` with the address from step 3).

## Troubleshooting

- Problem: Remote/player page won't load.  
  Solution: Ensure both devices are on the same network, check the IP, and verify the laptop firewall isn't blocking connections.

- Problem: Code changes not visible.  
  Solution: Perform a hard refresh or clear browser cache.

- Problem: Video starts muted and won't unmute from remote.  
  Solution: Click once on the player page on the laptop to satisfy browser audio permission policies.

- Problem: Video won't enter fullscreen automatically.  
  Solution: Most browsers block automatic fullscreen; click once on the player page to allow it.

## Packaging for a new laptop

1. Copy the entire project folder (all `.js`, `.html`, `.json` files) to the new laptop.
2. Install Node.js if needed.
3. In the project folder run:

```
npm install
npm start
```

4. Follow the usage steps above.

You can now control the laptop's YouTube player from your phone over the local network.
