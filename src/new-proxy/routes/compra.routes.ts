import {Router} from "express";
import verifyToken from "../middlewares/verifyToken";
import { getMisCompras, getCompra, crearCompra, actualizarEstado, eliminarCompra } from "../controllers/compra.controller.js";

const router = Router();

// Endpoints protegidos
router.get("/compras", verifyToken, getMisCompras);
router.get("/compras/:id", verifyToken, getCompra);
router.post("/compras", verifyToken, crearCompra);
router.put("/compras/:id/estado", verifyToken, actualizarEstado);
router.delete("/compras/:id", verifyToken, eliminarCompra);

export default router;
