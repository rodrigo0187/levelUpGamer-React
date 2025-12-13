
import { db } from "../../db/db";

async function addCreatedAtToProducts() {
    try {
        console.log("Checking for 'created_at' column in 'productos'...");
        const [columns] = await db.query("SHOW COLUMNS FROM productos LIKE 'created_at'");

        if ((columns as any[]).length === 0) {
            console.log("Adding 'created_at' column...");
            await db.query("ALTER TABLE productos ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP");
            console.log("✅ 'created_at' column added successfully.");
        } else {
            console.log("ℹ️ 'created_at' column already exists.");
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Error adding created_at column:", err);
        process.exit(1);
    }
}

addCreatedAtToProducts();
