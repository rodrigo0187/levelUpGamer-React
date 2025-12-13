
import { db } from "../../db/db";
import bcrypt from "bcryptjs";

async function debugLogin() {
    console.log("--- Debugging Login Logic ---");
    const email = "admin@admin.com";

    try {
        // 1. Check Table Status
        console.log("Checking table info...");
        const [tableInfo] = await db.query("SHOW FULL TABLES LIKE 'usuarios'");
        console.log("Table Info:", tableInfo);

        // 2. Run Select
        console.log(`Selecting user with email: ${email}`);
        const [rows] = await db.query<any[]>("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (rows.length === 0) {
            console.log("No user found.");
            process.exit(0);
        }

        const user = rows[0];
        console.log("User found. Keys:", Object.keys(user));
        console.log("User data (partial):", { id: user.id, email: user.email, role: user.role });
        console.log("Has 'password'?", user.password !== undefined);
        console.log("Has 'psw'?", user.psw !== undefined);

        // 3. Test Bcrypt
        if (user.password) {
            console.log("Testing bcrypt with 'password' column...");
            const match = await bcrypt.compare("admin123", user.password);
            console.log("Bcrypt match:", match);
        } else {
            console.log("Skipping bcrypt (no password column generated).");
        }

        process.exit(0);

    } catch (err: any) {
        console.error("❌ Error encountered:", err);
        if (err.sqlMessage) console.error("SQL Message:", err.sqlMessage);
        process.exit(1);
    }
}

debugLogin();
