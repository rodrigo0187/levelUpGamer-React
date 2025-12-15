import type { Request, Response } from "express";
import { ProductoService } from "../services/producto.service";
/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: API para gestión de productos
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, created_at]
 *         description: Campo para ordenar
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Orden de clasificación
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   precio:
 *                     type: number
 */
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

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
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

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
export const createProducto = async (req: Request, res: Response) => {
  try {
    const id = await ProductoService.create(req.body);
    res.status(201).json({ message: "Producto creado", id });
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
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

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
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
