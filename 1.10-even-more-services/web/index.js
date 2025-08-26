const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const filePath = path.join('/usr/src/app/shared', 'status.json');

app.get('/status', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.json({ ...data, currentTime: new Date().toISOString() });
    } catch (err) {
        res.status(500).json({ error: 'No status available' });
    }
});

app.get('/health', (req, res) => res.json({ status: 'healthy' }));

app.get('/', (req, res) => res.send(`<h1>Status App</h1><p>See <a href="/status">/status</a></p>`));

app.listen(port, () => console.log(`Web server running on port ${port}`));
