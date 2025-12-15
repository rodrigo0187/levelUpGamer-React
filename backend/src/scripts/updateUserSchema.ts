import { db } from "../../db/db";

async function updateUserSchema() {
    try {
        console.log("Actualizando esquema de usuarios...");

        // 1. Check if 'activo' column exists
        const [columns] = await db.query("SHOW COLUMNS FROM usuarios LIKE 'activo'");
        if ((columns as any[]).length === 0) {
            console.log("Agregando columna 'activo'...");
            await db.query("ALTER TABLE usuarios ADD COLUMN activo BOOLEAN DEFAULT 1");
        } else {
            console.log("Columna 'activo' ya existe.");
        }

        // 2. Check if 'avatar' column exists, if not we ignore it in code, 
        // but code was failing because it selected it. We will fix the code, no need to alter DB for avatar if we don't use it.

        console.log("✅ Esquema actualizado correctamente");
        process.exit(0);

    } catch (err) {
        console.error("❌ Error al actualizar esquema:", err);
        process.exit(1);
    }
}

updateUserSchema();
