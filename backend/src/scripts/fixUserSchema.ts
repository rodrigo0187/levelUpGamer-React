
import { db } from "../../db/db";

async function fixUserSchema() {
    try {
        console.log("Fixing 'usuarios' table schema...");

        console.log("Renaming 'password' to 'psw'...");
        try {
            await db.query("ALTER TABLE usuarios CHANGE password psw VARCHAR(255) NOT NULL");
            console.log("✅ Renamed 'password' to 'psw'");
        } catch (e: any) {
            console.log(`⚠️ No se pudo cambiar el nombre de la contrasena,Es posible que no exista o que ya exista "pws". Error: ${e.message}`);
        }

        console.log("Renaming 'rol' to 'role'...");
        try {
            await db.query("ALTER TABLE usuarios CHANGE rol role VARCHAR(50) DEFAULT 'user'");
            console.log("✅ Renamed 'rol' to 'role'");
        } catch (e: any) {
            console.log(`⚠️ No se puede cambiar el nombre del 'Rol'. Puede que no exista o que el rol ya exista. Error: ${e.message}`);
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
