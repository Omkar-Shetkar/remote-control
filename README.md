YouTube LAN Remote Control
# Remote-Control: Control YouTube Playback Remotely

Control YouTube playback on your laptop or desktop from your mobile phone over your local Wi-Fi network. This project uses a Node.js server with WebSockets for real-time, two-way communication.

---

## Features

- **Real-time Sync**: Instantaneous playback control (play, pause, seek, volume).
- **Dynamic UI**: Remote control icons update to reflect the player's current state (e.g., shows a pause icon when playing).
- **Video Loading**: Load any YouTube video by pasting its URL or ID into the remote.
- **Smart Paste**: Automatically detects a YouTube link in your clipboard and shows a quick-paste button on the remote.
- **Fullscreen Control**: Double-click the player on your laptop to toggle fullscreen mode.
- **Auto-Discovery**: The player screen automatically displays the correct URL for the remote control, specific to your Wi-Fi network.

---

## ⭐ Quick Setup (Recommended)

These one-line commands will download and run an intelligent script that automatically checks for prerequisites (like Git and Node.js), installs them if missing, clones the project, and launches the application.

### For Windows

Open PowerShell and run this command:

```powershell
irm https://raw.githubusercontent.com/Omkar-Shetkar/remote-control/main/setup.ps1 | iex
```

### For macOS & Linux

Open your Terminal and run this command:

```bash
bash <(curl -s https://raw.githubusercontent.com/Omkar-Shetkar/remote-control/main/setup.sh)
```

---

## Manual Installation

If you prefer to set up the project manually, follow these steps.

### Prerequisites

- **Node.js**: v16 or higher
- **Git**: Git SCM

### Steps

1. **Clone the Repository**:

  ```bash
  git clone https://github.com/Omkar-Shetkar/remote-control.git
  ```

2. **Navigate to the Directory**:

  ```bash
  cd remote-control
  ```

3. **Install Dependencies**:

  ```bash
  npm install
  ```

4. **Start the Server**:

  ```bash
  npm start
  ```

5. **Follow Terminal Instructions**: The terminal will display the URLs to open on your laptop (player) and mobile phone (remote).

---

## How It Works

- **Node.js Server**: An all-in-one server using Express.js serves the static HTML files and manages the WebSocket connections.
- **WebSocket (ws)**: Provides the real-time, bidirectional communication channel between the remote and the player.
- **YouTube IFrame API**: Allows the player page to control the embedded YouTube video programmatically.

---

## Troubleshooting

- **"Connecting to server..." is stuck**: Ensure the Node.js server is running in your terminal and that your laptop and phone are connected to the same Wi-Fi network.
- **Remote URL doesn't work**: Check your firewall settings. Sometimes, firewalls can block local network connections. You may need to create an exception for Node.js.
- **Video starts muted**: This is a browser security feature. You must click once on the player page on your laptop to allow audio playback.