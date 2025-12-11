// =====================================
// CREAR USUARIO ADMIN EN MYSQL
// =====================================

import { db } from "../../db/db";
import bcrypt from "bcryptjs";

async function crearAdmin() {
  try {
    console.log("Verificando si existe el administrador...");

    // Verificar si ya existe admin
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      ["admin@admin.com"]
    );

    if ((rows as any[]).length > 0) {
      console.log("❗ El usuario admin YA existe.");
      process.exit(0);
    }

    // Hash ya generado previamente

    // Hash generado para 'admin123'
    const passwordHash = await bcrypt.hash("admin123", 10);

    // Insertar admin o actualizar si existe
    await db.query(
      `INSERT INTO usuarios (nombre, email, telefono, psw, role) 
       VALUES (?, ?, ?, ?, 'admin') 
       ON DUPLICATE KEY UPDATE psw = ?, role = 'admin'`,
      ["Administrador", "admin@admin.com", "12345678", passwordHash, passwordHash]
    );

    console.log("✅ Usuario administrador creado con éxito");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error al crear admin:", err);
    process.exit(1);
  }
}

crearAdmin();
