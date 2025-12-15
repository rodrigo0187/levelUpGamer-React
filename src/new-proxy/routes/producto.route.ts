<<<<<<< HEAD
import express from "express";
import verifyAdmin from "../middlewares/verifyToken";
=======
import {Router} from "express";
import verifyToken from "../middlewares/verifyToken";
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
import { getAllProductos, getProductoById, createProducto, updateProducto, deleteProducto } from "../controllers/productos.controller";

const router = Router();

// Endpoints públicos
router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);

// Endpoints protegidos (admin o usuario autenticado)
router.post("/productos", verifyAdmin, createProducto);
router.put("/productos/:id", verifyAdmin, updateProducto);
router.delete("/productos/:id", verifyAdmin, deleteProducto);

export default router;
