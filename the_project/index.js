function randomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const generateTimestamp = () => {

    const printTimestamp = () => {
        const randomHash = randomUUID();
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}: ${randomHash}`);
        setTimeout(printTimestamp, 5000);
    }

    printTimestamp();
}

generateTimestamp();
