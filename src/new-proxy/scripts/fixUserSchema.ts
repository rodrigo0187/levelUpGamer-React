
import { db } from "../../db/db";

async function fixUserSchema() {
    try {
        console.log("Fixing 'usuarios' table schema...");

        // Start transaction just in case (though DDL is usually auto-commit in MySQL)
        // We will just do the alters. 
        // We need to check if columns exist before creating them to be safe? 
        // Or just try renaming. If 'password' doesn't exist, it might have been already renamed.

        console.log("Renaming 'password' to 'psw'...");
        try {
            await db.query("ALTER TABLE usuarios CHANGE password psw VARCHAR(255) NOT NULL");
            console.log("✅ Renamed 'password' to 'psw'");
        } catch (e: any) {
            console.log(`⚠️ Could not rename 'password'. It might not exist or 'psw' already exists. Error: ${e.message}`);
        }

        console.log("Renaming 'rol' to 'role'...");
        try {
            await db.query("ALTER TABLE usuarios CHANGE rol role VARCHAR(50) DEFAULT 'user'");
            console.log("✅ Renamed 'rol' to 'role'");
        } catch (e: any) {
            console.log(`⚠️ Could not rename 'rol'. It might not exist or 'role' already exists. Error: ${e.message}`);
        }

        console.log("🔍 Verifying final schema...");
        const [columns] = await db.query("SHOW COLUMNS FROM usuarios");
        console.table(columns);

        console.log("✅ Migration completed.");
        process.exit(0);

    } catch (err) {
        console.error("❌ Critical error during migration:", err);
        process.exit(1);
    }
}

fixUserSchema();
