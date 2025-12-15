import { Router } from "express";
import verifyAdmin from "../middlewares/verifyToken";
import { getAllProductos, getProductoById, createProducto, updateProducto, deleteProducto } from "../controllers/productos.controller";

const router = Router();

// Endpoints públicos
router.get("/", getAllProductos);
router.get("/:id", getProductoById);

// Endpoints protegidos (admin o usuario autenticado)
router.post("/", verifyAdmin, createProducto);
router.put("/:id", verifyAdmin, updateProducto);
router.delete("/:id", verifyAdmin, deleteProducto);

export default router;
