import {Router} from "express";
import verifyToken from "../middlewares/verifyToken";
import { getAllProductos, getProductoById, createProducto, updateProducto, deleteProducto } from "../controllers/productos.controller";

const router = Router();

// Endpoints públicos
router.get("/productos", getAllProductos);
router.get("/productos/:id", getProductoById);

// Endpoints protegidos (admin o usuario autenticado)
router.post("/productos", verifyToken, createProducto);
router.put("/productos/:id", verifyToken, updateProducto);
router.delete("/productos/:id", verifyToken, deleteProducto);

export default router;
