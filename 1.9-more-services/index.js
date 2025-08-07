const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Store the counter in memory
let requestCounter = 0;

// Ping-pong endpoint
app.get('/pingpong', (req, res) => {
    const currentCount = requestCounter;
    requestCounter++;

    const response = `pong ${currentCount}`;
    console.log(`${new Date().toISOString()}: Request #${currentCount + 1} - Responding with: ${response}`);

    res.send(response);
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        requestCount: requestCounter,
        uptime: process.uptime()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Ping-Pong Counter</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .container { max-width: 600px; }
                .info-box { background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0; }
                button { padding: 10px 20px; background: #007cba; color: white; border: none; border-radius: 3px; cursor: pointer; margin: 5px; }
                button:hover { background: #005a87; }
                .response { background: #e8f5e8; padding: 10px; margin: 10px 0; border-radius: 3px; font-family: monospace; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Ping-Pong Counter Application</h1>
                <div class="info-box">
                    <p><strong>Current Counter:</strong> <span id="counter">${requestCounter}</span></p>
                    <p><strong>Endpoint:</strong> <code>/pingpong</code></p>
                    <p><strong>Next Response:</strong> <code>pong ${requestCounter}</code></p>
                </div>
                <button onclick="sendPingRequest()">Send Ping Request</button>
                <button onclick="refreshCounter()">Refresh Counter</button>
                <div id="response" class="response" style="display: none;"></div>
            </div>
            
            <script>
                async function sendPingRequest() {
                    try {
                        const response = await fetch('/pingpong');
                        const text = await response.text();
                        document.getElementById('response').textContent = 'Response: ' + text;
                        document.getElementById('response').style.display = 'block';
                        refreshCounter();
                    } catch (error) {
                        console.error('Error sending ping request:', error);
                        document.getElementById('response').textContent = 'Error: ' + error.message;
                        document.getElementById('response').style.display = 'block';
                    }
                }
                
                async function refreshCounter() {
                    try {
                        const response = await fetch('/health');
                        const data = await response.json();
                        document.getElementById('counter').textContent = data.requestCount;
                        const nextResponse = document.querySelector('.info-box p:last-child code:last-child');
                        if (nextResponse) {
                            nextResponse.textContent = 'pong ' + data.requestCount;
                        }
                    } catch (error) {
                        console.error('Error fetching counter:', error);
                    }
                }
            </script>
        </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Ping-Pong Counter server running on port ${port}`);
    console.log(`Visit http://localhost:${port} for the web interface`);
    console.log(`Send requests to http://localhost:${port}/pingpong`);
});