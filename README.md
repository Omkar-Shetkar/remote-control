# 🚀 YouTube LAN Remote

# YouTube LAN Remote

Control YouTube on your laptop or PC from your phone. A simple Electron desktop app that exposes a browser-based YouTube player and a phone-accessible remote over your LAN.

---

## Key Features

- **System Tray Control**: Start/stop the server from the system tray (no CLI).
- **Smart URL Paste**: Detects a YouTube link in clipboard for one-tap loading.
- **Real‑Time Sync**: Remote icons update instantly to reflect player state.
- **Auto‑Discovery**: Player screen shows the exact URL to open on your phone.
- **Web‑Based Remote**: No phone app needed; use any browser.

---

## Installation

### From Releases

1. Go to the [Releases page](https://github.com/Omkar-Shetkar/remote-control/releases).
2. Download the installer for your OS (`.exe`, `.dmg`, or `.AppImage`).
3. Run the installer.

### Quick Notes

- After installation, launch **YouTube LAN Remote** from your apps menu.
- A tray/taskbar icon will appear.

  ![Installer Screenshot](<media/Screenshot 2025-10-17 at 9.27.52 AM.png>)

---

## How to Use

1. Click the tray icon → **Start Server**.
2. Click the tray icon → **Open Player in Browser** to open the player on your computer.
3. On the player page, you’ll see a URL (e.g., `http://192.168.1.5:3000/remote.html`). Open that on your phone’s browser.
4. Control playback from your phone. To stop the app, use the tray icon → **Quit**.

---

## For Developers (Manual Build)

### Prerequisites

- [Node.js (LTS)](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Clone and Install

```bash
git clone https://github.com/Omkar-Shetkar/remote-control.git
cd remote-control
npm install
```

### Run in Development

```bash
npm start
```

### Build Installers

```bash
npm run dist
```

Installers will be produced in the `dist/` directory.

---

## How It Works

Built with Electron: a Node.js backend + web frontend. The player and remote communicate via WebSockets for real‑time control and state synchronization.

---

## 🐛Troubleshooting

**AppImage Fails to Start on Linux with a "Sandbox" Error**:  
If you see an error related to `chrome-sandbox` when running the `.AppImage`, launch it from the terminal with the `--no-sandbox` flag:

```bash
./YouTube-LAN-Remote-1.0.0.AppImage --no-sandbox
```