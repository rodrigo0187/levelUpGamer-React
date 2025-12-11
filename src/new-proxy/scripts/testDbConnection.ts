import { db } from "../../db/db";

async function testConnection() {
    try {
        console.log("Testing database connection...");
        console.log("Config:", {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            db: process.env.DB_NAME,
            port: process.env.DB_PORT
        });

        const connection = await db.getConnection();
        console.log("✅ Successfully connected to database!");

        // Print logic database name if possible to verify
        const [rows] = await connection.query("SELECT DATABASE() as dbname");
        console.log("Connected to:", rows);

        connection.release();
        process.exit(0);
    } catch (err: any) {
        console.error("❌ Connection failed:");
        console.error("Code:", err.code);
        console.error("Errno:", err.errno);
        console.error("Syscall:", err.syscall);
        console.error("Hostname:", err.hostname);
        console.error("Message:", err.message);
        process.exit(1);
    }
}

testConnection();
