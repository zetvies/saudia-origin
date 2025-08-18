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

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { nama, email, whatsapp } = req.body;
    
    // Log form data
    console.log('Form submitted:', { nama, email, whatsapp });
    
    // Send WebSocket signal to all connected clients
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'form-submitted',
                data: { nama, email, whatsapp }
            }));
        }
    });
    
    res.json({ success: true, message: 'Form submitted successfully' });
});

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('New WebSocket connection established');
    
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Form page available at http://localhost:${PORT}/form`);
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});
