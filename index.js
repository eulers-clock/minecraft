// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Allow CORS from any origin
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Example POST endpoint
app.post('/', (req, res) => {
  console.log('Received data:', req.body);
  res.json({ message: 'Success!', data: req.body });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

