🚀 YouTube LAN Remote 🚀
# Remote Control for YouTube

Control YouTube on your laptop or PC from the comfort of your phone!

Ever wanted to pause, play, change the volume, or switch videos from your couch without touching your laptop? This project turns your phone into a powerful, real-time remote control for the YouTube player on your computer.

---

## ✨ Live Demo

Experience the magic of controlling YouTube playback in real-time! Watch this quick demonstration to see how to load a video and how playback is seamlessly controlled:

[![Live Demo](https://img.youtube.com/vi/Ec4icbVIZlI/0.jpg)](https://youtu.be/Ec4icbVIZlI?si=VJI16LrD8KsmRkem)

Click the image or [this link](https://youtu.be/Ec4icbVIZlI?si=VJI16LrD8KsmRkem) to watch the demo.

---

## ⭐ Key Features
- **📱 Full Playback Control**: Play, pause, seek, and control volume.
- **📋 Smart URL Paste**: Automatically detects a YouTube link in your clipboard and shows a one-tap paste button.
- **🔄 Real-Time Sync**: Control icons on the remote (like play/pause and mute/unmute) instantly update to reflect the player's current state.
- **🔗 Auto-Discovery**: The player screen automatically shows you the exact URL to open on your phone—no IP address hunting needed!
- **🖥️ Immersive Viewing**: Double-click the player on your laptop to toggle a true full-screen experience.
- **🌐 Web-Based**: No app installation needed! Works in the web browser on any modern phone and laptop on the same Wi-Fi network.

---

## ⚡ Get Started in 60 Seconds

Getting started is as simple as running one command. Open a terminal (on Mac/Linux) or PowerShell (on Windows) and run the command for your operating system.

### For Windows (run in PowerShell):
```powershell
irm https://raw.githubusercontent.com/Omkar-Shetkar/remote-control/main/setup.ps1 | iex
```

### For macOS & Linux (run in Terminal):
```bash
curl -sL https://raw.githubusercontent.com/Omkar-Shetkar/remote-control/main/setup.sh | bash
```

The script will automatically handle the installation. Once it's finished, see the section below for how to start the server next time!

---

## ▶️ How to Start the Server Next Time

You only need to run the setup script once. To start the server any time after that, just follow these two simple steps:

1. Open your terminal (or PowerShell on Windows) and navigate to the project folder:
  ```bash
  cd remote-control
  ```

2. Run the start command:
  ```bash
  npm start
  ```

That's it! The server will launch, and your terminal will display the URLs to open on your laptop and phone. To stop the server, press `Ctrl + C` in the same terminal window.

---

## 🛠️ Manual Installation

If you prefer to set things up yourself:

### Prerequisites:
- **Node.js** (LTS version)
- **Git**

### Steps:
1. Clone the Repository:
  ```bash
  git clone https://github.com/Omkar-Shetkar/remote-control.git
  ```

2. Navigate to the Directory:
  ```bash
  cd remote-control
  ```

3. Install Dependencies:
  ```bash
  npm install
  ```

4. Start the Server:
  ```bash
  npm start
  ```

### Stop the Server:
To stop the server, go back to the terminal window where it is running and press `Ctrl + C`.

---

## 💡 How It Works

This project uses a Node.js server to create a real-time, two-way communication channel between your phone and laptop using WebSockets.

- **The Player (Laptop)**: A web page that embeds a YouTube video and listens for commands.
- **The Remote (Phone)**: A mobile-friendly web page that sends commands.
- **The Server**: A lightweight Express and WebSocket server that relays messages instantly between the player and the remote.

```mermaid
graph TD
   subgraph Your Phone (Remote)
      A[Open remote.html] --> B{Press Play Button};
      B --> C[Sends 'play' command];
   end

   subgraph Your Laptop (Player)
      F[Open player.html] --> G{Receives 'play' command};
      G --> H[Tells YouTube player to play];
      H --> I[Sends 'state: playing' update];
   end

   subgraph Server
      D[WebSocket Server];
   end

   C -->|WebSocket| D;
   D -->|WebSocket| G;
   I -->|WebSocket| D;
   D -->|WebSocket| J[Remote UI updates to show 'Pause' icon];

   A -.->|HTTP Request| D;
   F -.->|HTTP Request| D;
```
