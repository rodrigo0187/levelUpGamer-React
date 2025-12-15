import { db } from "../db/db";
import type { IUsuario } from "../interfaces/IUsuario";
import type { UsuarioUpdate } from "../interfaces/UsuarioUpdate";

export class UsuariosRepository {
  static async getAll(): Promise<IUsuario[]> {
<<<<<<< HEAD
    const [rows] = await db.query("SELECT id, nombre, email, role, telefono, activo, avatar, created_at FROM usuarios");
=======
    const [rows] = await db.query("SELECT id, nombre, email, avatar FROM usuario");
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
    return rows as IUsuario[];
  }

  static async getById(id: number): Promise<IUsuario | null> {
<<<<<<< HEAD
    const [rows] = await db.query("SELECT id, nombre, email, role, telefono, activo FROM usuarios WHERE id = ?", [id]);
=======
    const [rows] = await db.query("SELECT id, nombre, email, avatar FROM usuario WHERE id = ?", [id]);
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
    return (rows as IUsuario[])[0] || null;
  }

  static async create(usuario: IUsuario & { password: string }): Promise<number> {
<<<<<<< HEAD
    const { nombre, email, password, telefono, role } = usuario;
    // Map password -> psw
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, psw, telefono, role, activo) VALUES (?, ?, ?, ?, ?, 1)",
      [nombre, email, password, telefono || null, role || 'user']
    );
=======
    const { nombre, email, password, avatar } = usuario;
    const [result] = await db.query("INSERT INTO usuario (nombre, email, password, avatar) VALUES (?, ?, ?, ?)", [nombre, email, password, avatar || null]);
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
    return (result as any).insertId;
  }

  static async updateById(id: number, data: Partial<UsuarioUpdate>): Promise<boolean> {
    const { nombre, email, telefono, role, activo } = data;

    const fields: string[] = [];
    const values: any[] = [];

    if (nombre !== undefined) { fields.push("nombre = ?"); values.push(nombre); }
    if (email !== undefined) { fields.push("email = ?"); values.push(email); }
    if (telefono !== undefined) { fields.push("telefono = ?"); values.push(telefono); }
    if (role !== undefined) { fields.push("role = ?"); values.push(role); }
    if (data.activo !== undefined) { fields.push("activo = ?"); values.push(data.activo); }

    if (fields.length === 0) return false;

    values.push(id);

    const [result] = await db.query(
<<<<<<< HEAD
      `UPDATE usuarios SET ${fields.join(", ")} WHERE id = ?`,
      values
=======
      "UPDATE usuario SET nombre = ?, email = ?, avatar = ? WHERE id = ?",
      [nombre, email, avatar, id]
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
    );
    return (result as any).affectedRows > 0;
  }

  static async deleteById(id: number): Promise<boolean> {
    const [result] = await db.query("DELETE FROM usuario WHERE id = ?", [id]);
    return (result as any).affectedRows > 0;
  }
}
