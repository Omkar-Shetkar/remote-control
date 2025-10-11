# YouTube Remote — Player Page

This HTML file is the "screen" for your remote. Open it on your laptop; it listens for commands sent from your mobile device.

## How to use

1. Run the server  
   Ensure the Node.js WebSocket server is running.

2. Open the player  
   Open `player.html` in a web browser (Chrome, Firefox, etc.).

3. Check the connection  
   The page should display **Connected** (green). If it shows **Disconnected**, verify the server is running and the WebSocket URL in `player.html` is correct (e.g. `ws://localhost:8080`).

## Important — Connecting from your phone

Your phone and laptop are separate devices, so you cannot use `localhost`. Replace `localhost` in both the player and the mobile remote code with your laptop's local IP address.

### How to find your local IP

- Windows: open Command Prompt and run `ipconfig` → look for "IPv4 Address" under the active adapter.
- macOS: System Settings > Wi‑Fi (or Network), or run `ifconfig | grep "inet "`.
- Linux: run `hostname -I`.

Example (if your laptop IP is `192.168.1.10`):

```js
const ws = new WebSocket("ws://192.168.1.10:8080");
```

Next, we'll build the remote control web page for your mobile phone.
