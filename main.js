const {
  app,
  Tray,
  Menu,
  shell,
  Notification,
  nativeImage,
} = require("electron");
const path = require("path");
const server = require("./server");

let tray = null;
let serverInstance = null;
let serverUrl = "";

// This function now handles creating and updating the menu
function updateContextMenu() {
  const isServerRunning = serverInstance !== null;

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "YouTube LAN Remote",
      enabled: false,
    },
    { type: "separator" },
    {
      label: "Start Server",
      id: "start",
      visible: !isServerRunning, // Show only if server is stopped
      click: startServer,
    },
    {
      label: "Stop Server",
      id: "stop",
      visible: isServerRunning, // Show only if server is running
      click: stopServer,
    },
    {
      label: "Open Player in Browser",
      id: "open-player",
      enabled: isServerRunning, // Enable only if server is running
      click: () => {
        if (serverUrl) {
          shell.openExternal(`${serverUrl}/player.html`);
        }
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.isQuitting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
}

function createTray() {
  const iconPath = path.join(__dirname, "assets", "icon.png");
  const trayIcon = nativeImage.createFromPath(iconPath);
  trayIcon.setTemplateImage(true);

  tray = new Tray(trayIcon);
  tray.setToolTip("YouTube LAN Remote");
  updateContextMenu(); // Set the initial menu
}

async function startServer() {
  if (serverInstance) {
    new Notification({
      title: "Server Info",
      body: "Server is already running.",
    }).show();
    return;
  }
  try {
    const { instance, url } = await server.start();
    serverInstance = instance;
    serverUrl = url;

    new Notification({
      title: "Server Started",
      body: "Server is running. Open the player on your laptop.",
    }).show();

    updateContextMenu(); // Update the menu to show "Stop Server"
  } catch (error) {
    console.error("Failed to start server:", error);
    let errorMessage = "Failed to start the server.";
    if (error.code === "EADDRINUSE") {
      errorMessage =
        "Port 3000 is already in use. Please close any other app using it and try again.";
    }
    new Notification({ title: "Server Error", body: errorMessage }).show();
  }
}

async function stopServer() {
  if (!serverInstance) {
    new Notification({
      title: "Server Info",
      body: "Server is not running.",
    }).show();
    return;
  }
  try {
    await server.stop(serverInstance);
    serverInstance = null;
    serverUrl = "";

    new Notification({
      title: "Server Stopped",
      body: "The server has been stopped.",
    }).show();

    updateContextMenu(); // Update the menu to show "Start Server"
  } catch (error) {
    console.error("Failed to stop server:", error);
    new Notification({
      title: "Error",
      body: "Failed to stop the server.",
    }).show();
  }
}

// App lifecycle events
app.on("ready", createTray);

app.on("window-all-closed", () => {
  // On macOS it's common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    // Do nothing, app should stay alive in tray
  }
});

app.on("before-quit", async () => {
  if (serverInstance) {
    await stopServer();
  }
});
