import { db } from "../../db/db";

async function updateProductSchema() {
    try {
        console.log("Actualizando esquema de productos...");

        // Check if 'stock' column exists
        const [columns] = await db.query("SHOW COLUMNS FROM productos LIKE 'stock'");
        if ((columns as any[]).length === 0) {
            console.log("Agregando columna 'stock'...");
            await db.query("ALTER TABLE productos ADD COLUMN stock INT DEFAULT 0");
        } else {
            console.log("Columna 'stock' ya existe.");
        }

        console.log("✅ Esquema de productos actualizado");
        process.exit(0);

    } catch (err) {
        console.error("❌ Error al actualizar esquema:", err);
        process.exit(1);
    }
}

updateProductSchema();
