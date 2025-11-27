import {db} from '../db/db.js';
import type { RowDataPacket ,ResultSetHeader} from 'mysql2/promise';

export interface Producto {
    id:number;
    nombre:string;
    descripcion?:string;
    precio:number;
    imagen?:string;
    stock:number;
    creado_en:string
}

// obtener todos los productos
export class ProductoService{
    // obtener todos los productos
    // async asincrona 
    static async getAll():Promise<Producto[]>{
        // await para espera la respuesta de la promesa (consulta o query)
        const [rows]= await db.query<RowDataPacket[]& Producto[]>(
            // consulta Query
            'SELECT * FROM producto order by creado_en DESC'
        );
        return rows;
    }

    // obtener producto por id
    static async getById(id:number):Promise<Producto[]>{
        const [rows] = await db.query<RowDataPacket[] & Producto[]>(
            'SELECT * FROM producto WHERE id = ?',[id]
        );
        return rows;
    }
    // crear un nuevo producto
    static async create(data :Omit<Producto, 'id'|'creado_en'>):Promise<number>{
        const {nombre,descripcion,precio,imagen,stock} = data;
        const[result] = await db.query<ResultSetHeader>(
            // insertar un nuevo producto
            'INSERT INTO producto (nombre,descripcion,precio,imagen,stock)VALUES(?,?,?,?,?)',
            [nombre,descripcion,precio,imagen,stock]
        );
        return result.insertId;
    }
    // actualizar un producto
    static async updateById(id:number,data: Partial<Omit<Producto ,"id"|"creado_en">>):Promise<boolean>{

    const {nombre,descripcion,precio,imagen,stock} = data;
    const [result] = await db.query<ResultSetHeader>(
        "UPDATE producto SET nombre = ? , set descripcion = ? , set precio =? , set imagen = ?,stock = ? WHERE id = ?",
        [nombre,descripcion,precio,imagen,stock,id]
    );
    return result.affectedRows>0;
    };

    // eliminar un producto
    static async deleteById(id:number):Promise<boolean>{
        const [result] = await db.query<ResultSetHeader>(
            "DELETE FROM producto WHERE id = ?",
            [id]
        )
        return result.affectedRows > 0;
    }
}





