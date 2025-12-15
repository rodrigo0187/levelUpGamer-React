
import { db } from "../../db/db";

async function addDescriptionToProducts() {
    try {
        console.log("Checking for 'description' column in 'productos'...");
        const [columns] = await db.query("SHOW COLUMNS FROM productos LIKE 'description'");

        if ((columns as any[]).length === 0) {
            console.log("Adding 'description' column...");
            await db.query("ALTER TABLE productos ADD COLUMN description TEXT DEFAULT NULL");
            console.log("✅ 'description' column added successfully.");
        } else {
            console.log("ℹ️ 'description' column already exists.");
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Error adding description column:", err);
        process.exit(1);
    }
}

addDescriptionToProducts();
