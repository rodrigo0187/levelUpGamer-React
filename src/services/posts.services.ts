import { db } from "../db/db";
import type { IPost } from "../interfaces/IPost";

export class PostsService {
    static async getAll(): Promise<IPost[]> {
        const [rows] = await db.query("SELECT * FROM posts ORDER BY fecha DESC");
        return rows as IPost[];
    }

    static async getById(id: number): Promise<IPost | null> {
        const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [id]);
        return (rows as IPost[])[0] || null;
    }

    static async create(post: IPost): Promise<number> {
        const { titulo, contenido, imagen, url, autor_id } = post;
        const [result] = await db.query(
            "INSERT INTO posts (titulo, contenido, imagen, url, autor_id, fecha) VALUES (?, ?, ?, ?, ?, NOW())",
            [titulo, contenido, imagen || null, url || null, autor_id]
        );
        return (result as any).insertId;
    }

    static async updateById(id: number, data: Partial<IPost>): Promise<boolean> {
        const fields: string[] = [];
        const values: any[] = [];

        if (data.titulo !== undefined) { fields.push("titulo = ?"); values.push(data.titulo); }
        if (data.contenido !== undefined) { fields.push("contenido = ?"); values.push(data.contenido); }
        if (data.imagen !== undefined) { fields.push("imagen = ?"); values.push(data.imagen); }
        if (data.url !== undefined) { fields.push("url = ?"); values.push(data.url); }
        // No updating autor_id or fecha_creacion usually

        if (fields.length === 0) return false;

        values.push(id);
        const [result] = await db.query(`UPDATE posts SET ${fields.join(", ")} WHERE id = ?`, values);
        return (result as any).affectedRows > 0;
    }

    static async deleteById(id: number): Promise<boolean> {
        const [result] = await db.query("DELETE FROM posts WHERE id = ?", [id]);
        return (result as any).affectedRows > 0;
    }
}
