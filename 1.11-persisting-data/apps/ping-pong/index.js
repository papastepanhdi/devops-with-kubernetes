const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const sharedDir = '/usr/src/app/shared';
const filePath = path.join(sharedDir, 'pingpong.txt');

// Ensure shared directory exists (PVC mount should create it, but just in case)
try {
    if (!fs.existsSync(sharedDir)) {
        fs.mkdirSync(sharedDir, { recursive: true });
        console.log(`Created shared directory at ${sharedDir}`);
    }
} catch (err) {
    console.error("Error ensuring shared directory:", err.message);
}

// Load existing counter if file exists
let counter = 0;
try {
    if (fs.existsSync(filePath)) {
        counter = parseInt(fs.readFileSync(filePath, 'utf8')) || 0;
        console.log(`Initialized counter from file: ${counter}`);
    } else {
        console.log("No existing counter file found. Starting from 0.");
    }
} catch (err) {
    console.error("Error reading counter file:", err.message);
}

// Helper to write counter
function writeCounter() {
    try {
        fs.writeFileSync(filePath, counter.toString(), { flag: 'w' });
        console.log(`Counter written to ${filePath}: ${counter}`);
    } catch (err) {
        console.error("Failed to write counter:", err.message);
    }
}

// Ping-pong endpoint
app.get('/pingpong', (req, res) => {
    counter++;
    writeCounter();
    const response = `pong ${counter}`;
    console.log(`${new Date().toISOString()}: ${response}`);
    res.send(response);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        counter
    });
});

// Root endpoint (simple UI)
app.get('/', (req, res) => {
    res.send(`
        <h1>Ping-Pong App</h1>
        <p>Counter: ${counter}</p>
        <p>Try <a href="/pingpong">/pingpong</a> to increment.</p>
    `);
});

// Start server
app.listen(port, () => {
    console.log(`Ping-Pong server running on port ${port}`);
});
