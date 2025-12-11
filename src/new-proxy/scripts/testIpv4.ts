import * as mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function testIp() {
    // Force IPv4
    const config = {
        host: '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT) || 3306
    };

    console.log("Testing connection to 127.0.0.1...");
    try {
        const conn = await mysql.createConnection(config);
        console.log("✅ SUCCESS! Connected to 127.0.0.1");
        await conn.end();
        process.exit(0);
    } catch (err: any) {
        console.error("❌ FAILED to connect to 127.0.0.1:", err.message);
        process.exit(1);
    }
}

testIp();
