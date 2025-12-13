import { db } from "../../db/db";

async function checkSchema() {
    try {
        console.log("validando 'productos' tabla...");
        const [columns] = await db.query("SHOW COLUMNS FROM productos");
        console.log(columns);
        process.exit(0);
    } catch (err) {
        console.error("Error al validar 'productos' tabla:", err);
        process.exit(1);
    }
}

checkSchema();
