import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3000;

// Optional: simple HTTP endpoint to check server
app.get('/', (req, res) => {
  res.send('WebSocket server is running!');
});

// Create HTTP server for WebSocket upgrade
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({
  server,
  perMessageDeflate: false // <-- disables RSV1 compression issue
});

console.log(wss);

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send initial subscription message
  ws.send(JSON.stringify({
    header: {
      version: "1",
      requestId: uuidv4(),
      messageType: "commandRequest",
      messagePurpose: "subscribe",
    },
    body: {
      eventName: "PlayerMessage"
    }
  }));

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
      console.log('Received:', parsed);
    } catch (err) {
      console.error('Invalid JSON:', message.toString());
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Listen on the assigned Render port
server.listen(PORT, () => {
  console.log(`Server running at https://minecraft-uhrb.onrender.com`);
});
