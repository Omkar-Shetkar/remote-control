# 🚀 YouTube LAN Remote

Control YouTube on your laptop or PC from your phone. A simple Electron desktop app that exposes a browser-based YouTube player and a phone-accessible remote over your LAN.

## Key features

- **System Tray Control** — Start/stop the server from the system tray (no CLI).
- **Smart URL Paste** — Detects a YouTube link in clipboard for one-tap loading.
- **Real‑Time Sync** — Remote icons update instantly to reflect player state.
- **Auto‑Discovery** — Player screen shows the exact URL to open on your phone.
- **Web‑Based Remote** — No phone app needed; use any browser.

## Installation

### From Releases

1. Go to the Releases page: https://github.com/Omkar-Shetkar/remote-control/releases
2. Download the installer for your OS (.exe, .dmg, or .AppImage).
3. Run the installer.

### Quick Notes

- After installation, launch "YouTube LAN Remote" from your apps menu.
- A tray/taskbar icon will appear.
  ![alt text](<Screenshot 2025-10-17 at 9.27.52 AM.png>)

## How to use

1. Click the tray icon → **Start Server**.
2. Click the tray icon → **Open Player in Browser** to open the player on your computer.
3. On the player page you’ll see an URL (e.g. `http://192.168.1.5:3000/remote.html`). Open that on your phone’s browser.
4. Control playback from the phone. To stop the app, use the tray icon → **Quit**.

## For developers (manual build)

### Prerequisites

- Node.js (LTS)
- Git

### Clone and install

```bash
git clone https://github.com/Omkar-Shetkar/remote-control.git
cd remote-control
npm install
```

### Run in development

```bash
npm start
```

### Build installers

```bash
npm run dist
```

Installers will be produced in `dist/`.

## How it works

Built with Electron: a Node.js backend + web frontend. Player and remote communicate via WebSockets for real‑time control and state sync.
