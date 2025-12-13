
import { db } from "../../db/db";

async function checkProductSchema() {
    try {
        const [columns] = await db.query("SHOW COLUMNS FROM productos");
        console.log(JSON.stringify(columns, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkProductSchema();
