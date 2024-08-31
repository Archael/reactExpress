const fs = require('fs');
const path = require('path');

const getPort = () => {
  const portFile = path.join(__dirname, '..', 'port.txt');
  try {
    const port = fs.readFileSync(portFile, 'utf8');
    return `http://localhost:${port}`;
  } catch (err) {
    console.error('Failed to read port file', err);
    return 'http://localhost:3000'; // fallback to default port
  }
};

console.log(getPort());
