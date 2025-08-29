const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const filePath = path.join('/usr/src/app/shared', 'pingpong.txt');

// UUID generator
function randomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Status endpoint
app.get('/status', (req, res) => {
    let counter = 0;
    try {
        if (fs.existsSync(filePath)) {
            counter = parseInt(fs.readFileSync(filePath, 'utf8')) || 0;
        }
    } catch (err) {
        console.warn("Could not read counter file:", err.message);
    }

    const status = {
        timestamp: new Date().toISOString(),
        randomString: randomUUID(),
        pingPongs: counter
    };

    res.json(status);
});

// Health endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Root UI
app.get('/', (req, res) => {
    let counter = 0;
    try {
        if (fs.existsSync(filePath)) {
            counter = parseInt(fs.readFileSync(filePath, 'utf8')) || 0;
        }
    } catch (err) {
        console.warn("Could not read counter file:", err.message);
    }

    res.send(`
        <h1>Log Output App</h1>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Random String:</strong> ${randomUUID()}</p>
        <p><strong>Ping / Pongs:</strong> ${counter}</p>
    `);
});

// Start server
app.listen(port, () => {
    console.log(`Log Output app running on port ${port}`);
});
