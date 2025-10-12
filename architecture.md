```mermaid
graph TD
    subgraph "Clients (Your Devices)"
        Mobile[<i class='fa fa-mobile-alt'></i> Mobile Device <br>(remote.html)]
        Laptop[<i class='fa fa-laptop'></i> Laptop/Desktop <br>(player.html)]
    end

    subgraph "Backend"
        Server[<i class='fa fa-server'></i> Node.js Server <br>(WebSocket & HTTP)]
    end

    %% Initial Page Load & WebSocket Handshake
    Mobile -- "1. HTTP: GET /remote.html" --> Server
    Server -- "Serves HTML/CSS/JS" --> Mobile
    Laptop -- "1. HTTP: GET /player.html" --> Server
    Server -- "Serves HTML/CSS/JS" --> Laptop
    Mobile <==> |"2. Establishes WebSocket Connection"| Server
    Laptop <==> |"2. Establishes WebSocket Connection"| Server

    %% Main Control Flow (Mobile to Laptop)
    Mobile -- "3. User Action: Sends Command <br> (e.g., { type: 'command', command: 'togglePlay' })" --> Server
    Server -- "4. Relays Command to Player" --> Laptop
    Laptop -- "5. Executes Command on YouTube IFrame" --> Laptop

    %% Status Feedback Flow (Laptop to Mobile)
    Laptop -- "6. Player Event: Sends Status Update <br> (e.g., { type: 'stateUpdate', state: { isPlaying: true } })" --> Server
    Server -- "7. Relays Status to Remote" --> Mobile
    Mobile -- "8. Updates UI Icons Dynamically" --> Mobile

    %% Style Definitions for better visuals
    style Mobile fill:#264653,stroke:#fff,stroke-width:2px,color:#fff
    style Laptop fill:#264653,stroke:#fff,stroke-width:2px,color:#fff
    style Server fill:#e76f51,stroke:#fff,stroke-width:2px,color:#fff
```