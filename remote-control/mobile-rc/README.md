# YouTube Remote — Remote Control Page

This is the remote control for your YouTube player. Open this file on your mobile phone to send commands to your laptop.

## How to Use — Final Steps

1. Find your laptop's local IP address (e.g., `192.168.1.10`).

2. Update the IP in the code:

   - In `player.html` change:
     ```
     ws://localhost:8080
     ```
     to
     ```
     ws://YOUR_IP_ADDRESS:8080
     ```
   - In `remote.html` change:
     ```
     ws://localhost:8080
     ```
     to
     ```
     ws://YOUR_IP_ADDRESS:8080
     ```
     Both files must point to the same IP address.

3. Start the server:

   - On your laptop, open a terminal in the server directory and run:
     ```
     npm start
     ```

4. Open the player:

   - On your laptop, open the modified `player.html` in a browser. It should connect to the server.

5. Open the remote on your phone:

   - You cannot open `remote.html` directly from the laptop filesystem on your phone.
   - Easiest: serve the directory containing `remote.html`. For example:
     ```
     python -m http.server
     ```
     This typically serves on port `8000`.
   - On your phone (same Wi‑Fi), open:
     ```
     http://YOUR_LAPTOP_IP:8000/remote.html
     ```
     Example:
     ```
     http://192.168.1.10:8000/remote.html
     ```

6. Control it:
   - The remote should show "Connected." Tapping buttons on your phone will control the YouTube video on your laptop in real time.

Note: Ensure phone and laptop are on the same network and any firewall allows the required ports.
