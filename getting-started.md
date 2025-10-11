# YouTube LAN Remote — Quick Setup

This guide gets the YouTube Remote Control application running with a single command and no manual setup.

The setup script will:

- Check for and install prerequisites (Git and Node.js).
- Clone the repository from GitHub.
- Install dependencies (`npm install`).
- Start the server and show the player and remote URLs.

## Windows (Quick Setup)

1. Open PowerShell or Terminal as Administrator.
2. Paste and run:

```powershell
iex (irm 'https://raw.githubusercontent.com/Omkar-Shetkar/remote-control/main/setup.ps1')
```

## macOS & Linux (Quick Setup)

1. Open Terminal.
2. Paste and run:

```bash
curl -sL https://raw.githubusercontent.com/Omkar-Shetkar/remote-control/main/setup.sh | bash
```

After the script completes it will display the URLs for the player (laptop) and the remote (phone). Follow the on-screen instructions to start using the remote.
