
import { db } from "../../db/db";
import fs from "fs";

async function checkSchema() {
    try {
        const [columns] = await db.query("SHOW COLUMNS FROM usuarios");
        fs.writeFileSync("src/new-proxy/scripts/schema_output.txt", JSON.stringify(columns, null, 2));
        console.log("Written to src/new-proxy/scripts/schema_output.txt");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkSchema();