import { db } from '../db/db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface Producto {
    id: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    imagen?: string;
    stock: number;
}

export class ProductoService {
    static async getAll(): Promise<Producto[]> {
        const [rows] = await db.query<RowDataPacket[] & Producto[]>(
            "SELECT id, name as nombre, price as precio, img as imagen, `desc` as descripcion, stock FROM productos"
        );
        return rows;
    }

    static async getById(id: number): Promise<Producto[]> {
        const [rows] = await db.query<RowDataPacket[] & Producto[]>(
            "SELECT id, name as nombre, price as precio, img as imagen, `desc` as descripcion, stock FROM productos WHERE id = ?",
            [id]
        );
        return rows;
    }

    static async create(data: any): Promise<number> {
        const { nombre, descripcion, precio, imagen, stock } = data;
        const code = "GEN" + Date.now().toString().slice(-4);
        const category = "GEN";

        const [result] = await db.query<ResultSetHeader>(
            "INSERT INTO productos (name, `desc`, price, img, stock, code, category) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nombre, descripcion, precio, imagen, stock, code, category]
        );
        return result.insertId;
    }

    static async updateById(id: number, data: any): Promise<boolean> {
        const { nombre, descripcion, precio, imagen, stock } = data;

        // Dynamic query building could be better but sticking to simple active fields
        // Note: The UI sends all fields usually. 
        const [result] = await db.query<ResultSetHeader>(
            "UPDATE productos SET name = ?, `desc` = ?, price = ?, img = ?, stock = ? WHERE id = ?",
            [nombre, descripcion, precio, imagen, stock, id]
        );
        return result.affectedRows > 0;
    }

    static async deleteById(id: number): Promise<boolean> {
        const [result] = await db.query<ResultSetHeader>(
            "DELETE FROM productos WHERE id = ?",
            [id]
        );
        return result.affectedRows > 0;
    }
}
