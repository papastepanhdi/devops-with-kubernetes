const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Store the random string in memory
let currentRandomString = '';
let lastUpdateTime = '';

function randomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const generateTimestamp = () => {
    const printTimestamp = () => {
        currentRandomString = randomUUID();
        lastUpdateTime = new Date().toISOString();
        console.log(`${lastUpdateTime}: ${currentRandomString}`);
        setTimeout(printTimestamp, 5000);
    }

    printTimestamp();
}

// Status endpoint
app.get('/status', (req, res) => {
    res.json({
        timestamp: lastUpdateTime,
        randomString: currentRandomString,
        currentTime: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Root endpoint for browser access
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Status Application</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .container { max-width: 600px; }
                .status-box { background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0; }
                button { padding: 10px 20px; background: #007cba; color: white; border: none; border-radius: 3px; cursor: pointer; }
                button:hover { background: #005a87; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Status Application</h1>
                <div class="status-box">
                    <p><strong>Last Update:</strong> <span id="timestamp">${lastUpdateTime}</span></p>
                    <p><strong>Random String:</strong> <span id="randomString">${currentRandomString}</span></p>
                    <p><strong>Current Time:</strong> <span id="currentTime">${new Date().toISOString()}</span></p>
                </div>
                <button onclick="refreshStatus()">Refresh Status</button>
                <button onclick="toggleAutoRefresh()" id="autoRefreshBtn">Enable Auto-Refresh</button>
            </div>
            
            <script>
                let autoRefreshInterval = null;
                
                async function refreshStatus() {
                    try {
                        const response = await fetch('/status');
                        const data = await response.json();
                        document.getElementById('timestamp').textContent = data.timestamp;
                        document.getElementById('randomString').textContent = data.randomString;
                        document.getElementById('currentTime').textContent = data.currentTime;
                    } catch (error) {
                        console.error('Error fetching status:', error);
                    }
                }
                
                function toggleAutoRefresh() {
                    const btn = document.getElementById('autoRefreshBtn');
                    if (autoRefreshInterval) {
                        clearInterval(autoRefreshInterval);
                        autoRefreshInterval = null;
                        btn.textContent = 'Enable Auto-Refresh';
                    } else {
                        autoRefreshInterval = setInterval(refreshStatus, 2000);
                        btn.textContent = 'Disable Auto-Refresh';
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// Start the timestamp generation
generateTimestamp();

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});