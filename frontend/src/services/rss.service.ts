import { db } from "../db/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface Rssitem{
  title:string;
  content:string;
  image:string|null;
  created_at:string;
}
export class RSSService {
  // Obtener todos los RSS
  static async getAll(): Promise<Rssitem[]> {
    const [rows] = await db.query<RowDataPacket[] & Rssitem[]>(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    return rows;
  }

  // Obtener por ID
  static async getById(id: number): Promise<Rssitem | null> {
    const [rows] = await db.query<RowDataPacket[] & Rssitem[]>(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  // Crear nuevo item RSS
  static async create(data: Omit<Rssitem, "id" | "created_at">): Promise<number> {
    const { title, content, image } = data;

    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)",
      [title, content, image]
    );

    return result.insertId;
  }

  // Actualizar RSS
  static async update(id: number, data: Partial<Omit<Rssitem, "id" | "created_at">>): Promise<boolean> {
    const { title, content, image } = data;

    const [result] = await db.query<ResultSetHeader>(
      "UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?",
      [title, content, image, id]
    );

    return result.affectedRows > 0;
  }

  // Eliminar RSS
  static async delete(id: number): Promise<boolean> {
    const [result] = await db.query<ResultSetHeader>(
      "DELETE FROM posts WHERE id = ?",
      [id]
    );

    return result.affectedRows > 0;
  }
}
