import { db } from "../db/db";
import type { IUsuario } from "../interfaces/IUsuario";

export class UsuariosRepository {
  static async getAll(): Promise<IUsuario[]> {
    const [rows] = await db.query("SELECT id, nombre, email, avatar FROM usuarios");
    return rows as IUsuario[];
  }

  static async getById(id: number): Promise<IUsuario | null> {
    const [rows] = await db.query("SELECT id, nombre, email, avatar FROM usuarios WHERE id = ?", [id]);
    return (rows as IUsuario[])[0] || null;
  }

  static async create(usuario: IUsuario & { password: string }): Promise<number> {
    const { nombre, email, password, avatar } = usuario;
    const [result] = await db.query("INSERT INTO usuarios (nombre, email, password, avatar) VALUES (?, ?, ?, ?)", [nombre, email, password, avatar || null]);
    return (result as any).insertId;
  }

  static async updateById(id: number, data: Partial<IUsuario>): Promise<boolean> {
    const { nombre, email, avatar } = data;
    const [result] = await db.query(
      "UPDATE usuarios SET nombre = ?, email = ?, avatar = ? WHERE id = ?",
      [nombre, email, avatar, id]
    );
    return (result as any).affectedRows > 0;
  }

  static async deleteById(id: number): Promise<boolean> {
    const [result] = await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
    return (result as any).affectedRows > 0;
  }
}
