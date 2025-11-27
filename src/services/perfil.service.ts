import { db } from "../db/db.js";
import type { RowDataPacket } from "mysql2";

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  avatar?: string;
}

export class PerfilService {
  static async getMyProfile(userId: number) {
    // Tipamos la respuesta como Usuario[]
    const [rows] = await db.query<RowDataPacket[] &Usuario>(
      "SELECT id, nombre, email, avatar FROM usuarios WHERE id = ?",
      [userId]
    );

    return rows[0]; // TypeScript ahora sabe que rows es Usuario[]
  }

  static async updateMyProfile(userId: number, data: { nombre?: string; email?: string; avatar?: string }) {
    const [result] = await db.query(
      "UPDATE usuarios SET nombre = ?, email = ?, avatar = ? WHERE id = ?",
      [data.nombre, data.email, data.avatar, userId]
    );
    return (result as any).affectedRows > 0;
  }
}
