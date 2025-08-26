const fs = require('fs');
const path = require('path');

const filePath = path.join('/usr/src/app/shared', 'status.json');

function randomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function updateStatus() {
    const status = {
        timestamp: new Date().toISOString(),
        randomString: randomUUID(),
    };
    fs.writeFileSync(filePath, JSON.stringify(status, null, 2));
    console.log(`Updated status: ${status.timestamp} -> ${status.randomString}`);
}

setInterval(updateStatus, 5000);
updateStatus();
