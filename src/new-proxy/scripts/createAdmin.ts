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
    const passwordHash =
      "$2b$10$mvwAn02CUL2tcC1gR3b9f.Zf/U/6WvX1FM1gXdKl1a2QU/iBDyhYC";

    // Insertar admin
    await db.query(
      "INSERT INTO usuarios (nombre, email, telefono, psw) VALUES (?, ?, ?, ?)",
      ["Administrador", "admin@admin.com", "000000000", passwordHash]
    );

    console.log("✅ Usuario administrador creado con éxito");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error al crear admin:", err);
    process.exit(1);
  }
}

crearAdmin();
