import express from "express";
import verifyAdmin from "../middlewares/verifyToken";
import { getAllProductos, getProductoById, createProducto, updateProducto, deleteProducto } from "../controllers/productos.controller";

const router = express.Router();

// Endpoints públicos
router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);

// Endpoints protegidos (admin o usuario autenticado)
router.post("/productos", verifyAdmin, createProducto);
router.put("/productos/:id", verifyAdmin, updateProducto);
router.delete("/productos/:id", verifyAdmin, deleteProducto);

export default router;
