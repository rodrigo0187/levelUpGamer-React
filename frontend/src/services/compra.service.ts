import { db } from "../db/db.js";
import type { RowDataPacket } from "mysql2/promise";

export interface Compra {
  id: number;
  id_usuario: number;
  estado: "pending" | "completed" | "cancelled";
  total: number;
  fecha: string;
}

export class CompraService {
  // Obtener todas las compras de un usuario
  static async getComprasByUsuario(userId: number): Promise<Compra[]> {
    const [rows] = await db.query<RowDataPacket[] & Compra[]>(
      "SELECT * FROM compra WHERE id_usuario = ? ORDER BY fecha DESC",
      [userId]
    );
    return rows;
  }

  // Obtener una compra por ID
  static async getCompraById(compraId: number, userId: number): Promise<Compra | null> {
    const [rows] = await db.query<RowDataPacket[] & Compra[]>(
      "SELECT * FROM compra WHERE id = ? AND id_usuario = ?",
      [compraId, userId]
    );
    return rows[0] || null;
  }

  // Crear nueva compra
  static async createCompra(userId: number, total: number, estado: "pending" | "completed" | "cancelled" = "pending"): Promise<number> {
    const [result] = await db.query(
      "INSERT INTO compra (id_usuario, estado, total) VALUES (?, ?, ?)",
      [userId, estado, total]
    );
    // @ts-ignore
    return result.insertId; // Devuelve el id de la compra creada
  }

  // Actualizar estado de compra
  static async updateEstado(compraId: number, estado: "pending" | "completed" | "cancelled"): Promise<boolean> {
    const [result] = await db.query(
      "UPDATE compra SET estado = ? WHERE id = ?",
      [estado, compraId]
    );
    // @ts-ignore
    return result.affectedRows > 0;
  }

  // Eliminar compra (opcional)
  static async deleteCompra(compraId: number): Promise<boolean> {
    const [result] = await db.query(
      "DELETE FROM compra WHERE id = ?",
      [compraId]
    );
    // @ts-ignore
    return result.affectedRows > 0;
  }
}
