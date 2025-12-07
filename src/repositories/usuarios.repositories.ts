import { db } from "../db/db";
import type { IUsuario } from "../interfaces/IUsuario";

export class UsuariosRepository {
  static async getAll(): Promise<IUsuario[]> {
    const [rows] = await db.query("SELECT id, nombre, email, avatar, role, telefono FROM usuarios");
    return rows as IUsuario[];
  }

  static async getById(id: number): Promise<IUsuario | null> {
    const [rows] = await db.query("SELECT id, nombre, email, avatar, role, telefono FROM usuarios WHERE id = ?", [id]);
    return (rows as IUsuario[])[0] || null;
  }

  static async create(usuario: IUsuario & { password: string }): Promise<number> {
    const { nombre, email, password, avatar, telefono, role } = usuario;
    // Map password -> psw
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, psw, avatar, telefono, role) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, email, password, avatar || null, telefono || null, role || 'user']
    );
    return (result as any).insertId;
  }

  static async updateById(id: number, data: Partial<IUsuario>): Promise<boolean> {
    const { nombre, email, avatar, telefono, role } = data;
    // Build dynamic query would be better, but for now fixed set
    // Note: This simple update might overwrite with nulls if not careful, but following existing pattern
    // Ideally we should construct the query dynamically.
    // For now, let's just make it work for what was there + new fields safely? 
    // Actually current implementation is hardcoded. Let's keep it simple but safe for consistency.

    const fields: string[] = [];
    const values: any[] = [];

    if (nombre !== undefined) { fields.push("nombre = ?"); values.push(nombre); }
    if (email !== undefined) { fields.push("email = ?"); values.push(email); }
    if (avatar !== undefined) { fields.push("avatar = ?"); values.push(avatar); }
    if (telefono !== undefined) { fields.push("telefono = ?"); values.push(telefono); }
    if (role !== undefined) { fields.push("role = ?"); values.push(role); }

    if (fields.length === 0) return false;

    values.push(id);

    const [result] = await db.query(
      `UPDATE usuarios SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    return (result as any).affectedRows > 0;
  }

  static async deleteById(id: number): Promise<boolean> {
    const [result] = await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return (result as any).affectedRows > 0;
  }
}
