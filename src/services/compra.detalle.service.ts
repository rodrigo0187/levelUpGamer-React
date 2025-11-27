import {db} from "../db/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface CompraDetalle {
    id: number;
    id_usuario:number;
    id_compra:number;
    id_producto:number;
    cantidad :number;
    precio:number;
    fecha:string
}

export class CompraDetalle{
    // crear tabla detalle
    static async create(detalle:Omit<CompraDetalle,"id"|"fecha">){
        const sql =
        'INSERT INTO compra_detalle (id_usuario,id_compra,id_producto,cantidad,precio) VALUES(?,?,?,?,?)';
        const [result]:any = await db.query(sql,[
            detalle.id_usuario,
            detalle.id_compra,
            detalle.id_producto,
            detalle.cantidad,
            detalle.precio
        ]);
        return {id:result.insertId,...detalle};
    }


    // obtener todas las ComprasDetalle
    static async getAll():Promise<CompraDetalle[]>{
    const [rows] = await db.query<RowDataPacket[] & CompraDetalle[]>(
        'SELECT * FROM compra_detalle order by fecha ASC'
    );
    return rows;
    }

    // buscar CompraDetalle por id_compra
    static async getById(id_compra:number):Promise<CompraDetalle[]>{
        const sql = 
        'SELECT * FROM compra_detalle WHERE id_compra = ?';
        const [rows] = await db.query(sql,[id_compra]);
        return rows as CompraDetalle[];
    }
    // obtener CompraDetalle por id_usuario
    static async getByUser(id_user:number):Promise<CompraDetalle[]>{
        const sql = 
        'SELECT * FROM compra_detalle WHERE id_usuario = ?';
        const [rows] = await db.query(sql,[id_user]);
        return rows as CompraDetalle[];
    }
}