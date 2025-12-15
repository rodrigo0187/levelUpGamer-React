//db compra
import type { Request, Response } from "express";
import { CompraService } from "../services/compra.service";

// get
export const getMisCompras = async (req: Request & { user?: { id: number } }, res: Response) => {
  try {
    const compras = await CompraService.getComprasByUsuario(req.user!.id);
    res.json(compras);
  } catch (err) {
    console.error("Error al obtener compras:", err);
    res.status(500).json({ message: "Error al obtener compras" });
  }
};

//get
export const getCompra = async (req: Request & { user?: { id: number } }, res: Response) => {
  try {
    const compraId = Number(req.params.id);
    const compra = await CompraService.getCompraById(compraId, req.user!.id);

    if (!compra) return res.status(404).json({ message: "Compra no encontrada" });

    res.json(compra);
  } catch (err) {
    console.error("Error al obtener compra:", err);
    res.status(500).json({ message: "Error al obtener compra" });
  }
};
//post
export const crearCompra = async (req: Request & { user?: { id: number } }, res: Response) => {
  try {
    const { total } = req.body;
    const compraId = await CompraService.createCompra(req.user!.id, total);

    res.status(201).json({ message: "Compra creada correctamente", compraId });
  } catch (err) {
    console.error("Error al crear compra:", err);
    res.status(500).json({ message: "Error al crear compra" });
  }
};
//put
export const actualizarEstado = async (req: Request, res: Response) => {
  try {
    const compraId = Number(req.params.id);
    const { estado } = req.body;
    const success = await CompraService.updateEstado(compraId, estado);

    if (!success) return res.status(404).json({ message: "Compra no encontrada" });

    res.json({ message: "Estado actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar estado:", err);
    res.status(500).json({ message: "Error al actualizar estado" });
  }
};
//delete
export const eliminarCompra = async (req: Request, res: Response) => {
  try {
    const compraId = Number(req.params.id);
    const success = await CompraService.deleteCompra(compraId);

    if (!success) return res.status(404).json({ message: "Compra no encontrada" });

    res.json({ message: "Compra eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar compra:", err);
    res.status(500).json({ message: "Error al eliminar compra" });
  }
};
