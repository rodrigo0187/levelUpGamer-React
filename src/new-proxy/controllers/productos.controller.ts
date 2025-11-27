import type { Request, Response } from "express";
import { ProductoService } from "../../services/producto.service";

export const getAllProductos = async (req: Request, res: Response) => {
  try {
    const productos = await ProductoService.getAll();
    res.json(productos);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

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

export const createProducto = async (req: Request, res: Response) => {
  try {
    const id = await ProductoService.create(req.body);
    res.status(201).json({ message: "Producto creado", id });
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

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
