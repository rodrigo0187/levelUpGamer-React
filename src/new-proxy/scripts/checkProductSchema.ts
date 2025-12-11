import { db } from "../../db/db";

async function checkSchema() {
    try {
        console.log("Checking 'productos' table...");
        const [columns] = await db.query("SHOW COLUMNS FROM productos");
        console.log(columns);
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkSchema();
