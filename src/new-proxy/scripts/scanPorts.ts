import net from 'net';

const ports = [3306, 3307, 3308, 8889, 5432];

function checkPort(port: number) {
    return new Promise((resolve) => {
        const socket = new net.Socket();

        socket.setTimeout(2000);

        socket.on('connect', () => {
            console.log(`✅ Port ${port} is OPEN`);
            socket.destroy();
            resolve(true);
        });

        socket.on('timeout', () => {
            console.log(`❌ Port ${port} TIMED OUT`);
            socket.destroy();
            resolve(false);
        });

        socket.on('error', (err) => {
            console.log(`❌ Port ${port} CLOSED (${err.message})`);
            resolve(false);
        });

        socket.connect(port, '127.0.0.1');
    });
}

async function scan() {
    console.log("Scanning database ports...");
    for (const port of ports) {
        await checkPort(port);
    }
}

scan();
