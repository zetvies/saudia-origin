const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve form.html for the /form route
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Serve game.html for the /game route
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

app.get('/game2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game2.html'));
});

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('New WebSocket connection established. Total clients:', wss.clients.size);
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('WebSocket message received:', data);
            console.log('Message type:', data.type);
            
            if (data.type === 'form-submitted') {
                console.log('Form submitted via WebSocket:', data.data);
                console.log('Broadcasting to', wss.clients.size, 'connected clients');
                
                // Broadcast form-submitted message to all connected clients
                let broadcastCount = 0;
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        const messageToSend = JSON.stringify({
                            type: 'form-submitted',
                            data: data.data
                        });
                        client.send(messageToSend);
                        broadcastCount++;
                        console.log(`Sent message to client ${broadcastCount}`);
                    }
                });
                console.log(`Broadcasted to ${broadcastCount} clients`);
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
            console.error('Raw message:', message.toString());
        }
    });
    
    ws.on('close', () => {
        console.log('WebSocket connection closed. Remaining clients:', wss.clients.size);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Form page available at http://localhost:${PORT}/form`);
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});
