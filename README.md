# YouTube Remote Control — Full Project

Control a YouTube video on your laptop using your mobile phone as a remote.

## Files

Place these four files in the same directory on your laptop:

- `package.json`
- `server.js`
- `player.html`
- `remote.html`

## Prerequisites

- Node.js installed
- Both devices on the same Wi‑Fi network

## How to run

1. Install dependencies  
   Open a terminal in the project directory and run:

   ```
   npm install
   ```

   This installs `express` and `ws`.

2. Start the server  
   In the same terminal run:

   ```
   npm start
   ```

   The server will run on port `8080`.

3. Open the player on your laptop  
   In a browser on your laptop navigate to:

   ```
   http://localhost:8080/player.html
   ```

   The YouTube player should appear and show "Connected".

4. Open the remote on your phone

   - Ensure your phone is on the same Wi‑Fi network as your laptop.
   - Find your laptop's local IP:
     - Windows: run `ipconfig` and look for the "IPv4 Address".
     - macOS: open System Settings > Wi‑Fi and view the IP.
   - On your phone, open a browser and go to:
     ```
     http://YOUR_LAPTOP_IP:8080/remote.html
     ```
     Example:
     ```
     http://192.168.1.55:8080/remote.html
     ```

5. Control the player  
   The remote page should show "Connected". Use the buttons to play, pause, seek, and adjust volume on the laptop's video.

## Troubleshooting

- Confirm both devices are on the same network.
- Check firewall settings if the phone cannot reach the laptop.
- Verify the server logs show it is listening on port `8080`.
