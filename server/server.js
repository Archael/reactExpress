const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const messageRoutes = require('./routes/messageRoutes');
const { sendPendingMessages } = require('./utils/emailService');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', messageRoutes);

// Find an available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = app.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
  });
};

// Start the server
findAvailablePort(3000)
  .then((port) => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);

      // Write the full URL to a file that the frontend can read
      const portFile = path.join(__dirname, '..', 'port.txt');
      fs.writeFileSync(portFile, `http://localhost:${port}`);
    });

    // Schedule email sending every 15 seconds
    setInterval(sendPendingMessages, 15000);
  })
  .catch((err) => {
    console.error('Failed to find an available port', err);
  });
