const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// --- UPDATED: Smarter function to find the Wireless LAN IP address ---
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    let wirelessIp = null;
    let fallbackIp = null;

    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            if (iface.family !== 'IPv4' || iface.internal) {
                continue;
            }

            // --- Prioritization Logic ---
            // Prioritize interfaces that are clearly wireless
            if (name.toLowerCase().includes('wi-fi') || name.toLowerCase().includes('wlan')) {
                wirelessIp = iface.address;
                break; // Found the best option for this interface, move to the next
            }
            
            // Keep the first valid IP as a fallback
            if (!fallbackIp) {
                fallbackIp = iface.address;
            }
        }
        if (wirelessIp) break; // Found a wireless IP, no need to check other interfaces
    }
    
    // Return the wireless IP if found, otherwise the fallback, otherwise localhost
    return wirelessIp || fallbackIp || 'localhost';
}

app.use(express.static(path.join(__dirname)));

const players = new Set();
const remotes = new Set();

wss.on('connection', (ws) => {
    console.log('A new client connected.');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === 'identify') {
                if (data.clientType === 'player') {
                    console.log('Player client identified.');
                    players.add(ws);

                    // Send server info with the correct remote URL to the player
                    const remoteUrl = `http://${getLocalIpAddress()}:${PORT}/remote.html`;
                    ws.send(JSON.stringify({ type: 'serverInfo', remoteUrl: remoteUrl }));

                } else if (data.clientType === 'remote') {
                    console.log('Remote client identified.');
                    remotes.add(ws);
                }
                return;
            }

            if (remotes.has(ws) && data.type === 'command') {
                players.forEach(player => {
                    if (player.readyState === WebSocket.OPEN) {
                        player.send(JSON.stringify(data));
                    }
                });
            } else if (players.has(ws) && data.type === 'stateUpdate') {
                remotes.forEach(remote => {
                    if (remote.readyState === WebSocket.OPEN) {
                        remote.send(JSON.stringify(data));
                    }
                });
            }
        } catch (error) {
            console.error('Failed to process message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected.');
        players.delete(ws);
        remotes.delete(ws);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

server.listen(PORT, () => {
    const ipAddress = getLocalIpAddress();
    console.log(`\n--- YouTube Remote Server is running ---`);
    console.log(`\n[PLAYER] Open this on your Laptop/Desktop:`);
    console.log(`         http://localhost:${PORT}/player.html`);
    console.log(`\n[REMOTE] Open this on your Mobile Phone:`);
    console.log(`         http://${ipAddress}:${PORT}/remote.html\n`);
});

