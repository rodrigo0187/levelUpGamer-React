
import { db } from "../../db/db";
import fs from "fs";

async function checkAllSchemas() {
    try {
        const [prodColumns] = await db.query("SHOW COLUMNS FROM productos");
        fs.writeFileSync("src/schema_debug.json", JSON.stringify(prodColumns, null, 2));
        console.log("Written to src/schema_debug.json");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkAllSchemas();
