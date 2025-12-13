
import { db } from "../../db/db";

async function addAvatarColumn() {
    try {
        console.log("Checking for 'avatar' column...");
        const [columns] = await db.query("SHOW COLUMNS FROM usuarios LIKE 'avatar'");

        if ((columns as any[]).length === 0) {
            console.log("Adding 'avatar' column...");
            await db.query("ALTER TABLE usuarios ADD COLUMN avatar VARCHAR(255) DEFAULT NULL");
            console.log("✅ 'avatar' column added successfully.");
        } else {
            console.log("ℹ️ 'avatar' column already exists.");
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Error adding avatar column:", err);
        process.exit(1);
    }
}

addAvatarColumn();
