import {CompraDetalle} from "../../services/compra.detalle.service";
import type {Request, Response} from "express";

// Obtener todos los detalles compra
export const getAllcompraDetalle = async(res:Response)=>{
    try{
        const detalle = await CompraDetalle.getAll();
        res.json(detalle);
    }catch(error){
        console.error("Error al obtener los detalles de compra",error);
        res.status(500).json({message:"Error al obtener detalles"});
    }
};

//  crear detalle compra
export const createCompraDetalle = async(req:Request, res:Response)=>{
try{
    const detalle= await CompraDetalle.create(req.body);
    res.json(detalle);
}catch(error){
    console.error("Error al crear el detalle",error);
    res.status(500).json({message:"Error al crear el detalle Compra"});
}
};

// Obtener el detalle de la compra por id
export const getCompraDetalleById = async(req: Request, res:Response)=>{
    try{
        // obtener el id_compra codificado
        const id_compra = Number(req.params.id_compra);
        const detalle = await CompraDetalle.getById(id_compra);
        res.json(detalle);
    }catch(error){
        console.error("Error al obtener detaller",error);
        res.status(500).json({message:"Error al obtener detalles"});
    }
};

// Obtener el detalle de la compra por id_usuario
export const getCompraDetalleByIdUser = async(req:Request,res:Response)=>{
    try{
        // agregamos el id usuario codificado
        const id_usuario = req.user.id_usuario;
        if(isNaN(id_usuario)){
            return res.status(404).json({message:"El id debe ser un numero valido."})
        }        
        const detalle = await CompraDetalle.getByUser(id_usuario);
        if(!detalle || detalle.length == 0){
            return res.status(404).json({message:"No se encontraron detalles para este usuario"})
        }
        res.json(detalle);
    }catch(error){
        console.error("Error al obtener detalles por id_usuario",error);
        res.status(500).json({message:"Error al obtener detalles usuario"});
    }
};

