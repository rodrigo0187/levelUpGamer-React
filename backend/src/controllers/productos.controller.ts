import type { Request, Response } from "express";
import { ProductoService } from "../services/producto.service";
//get
export const getAllProductos = async (req: Request, res: Response) => {
  try {
    const { sortBy, order } = req.query;
    const productos = await ProductoService.getAll(
      sortBy as 'id' | 'created_at',
      order as 'ASC' | 'DESC'
    );
    res.json(productos);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};
//get
export const getProductoById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const producto = await ProductoService.getById(id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(producto);
  } catch (err) {
    console.error("Error al obtener producto:", err);
    res.status(500).json({ message: "Error al obtener producto" });
  }
};
//post
export const createProducto = async (req: Request, res: Response) => {
  try {
    const id = await ProductoService.create(req.body);
    res.status(201).json({ message: "Producto creado", id });
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).json({ message: "Error al crear producto" });
  }
};
// put
export const updateProducto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const success = await ProductoService.updateById(id, req.body);
    if (!success) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};
// delete
export const deleteProducto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const success = await ProductoService.deleteById(id);
    if (!success) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};
