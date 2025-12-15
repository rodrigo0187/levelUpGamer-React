import { Router } from "express";
import verifyToken from "../middlewares/verifyToken";
// llamada de metodos que contiene el controller
import {
    getAllcompraDetalle,
    getCompraDetalleById,
    createCompraDetalle,
    getCompraDetalleByIdUser
} from "../controllers/compra.detalle.controller";


const router = Router();
// crear detalle
router.post("/compra-detalle", verifyToken, createCompraDetalle);

// todos los detalles de la compra
router.get("/compra-detalle", verifyToken, getAllcompraDetalle);

//obtener detalle compra por id
router.get("/compra-detalle/compra/:id_compra", verifyToken, getCompraDetalleById);

// obtener el detalle compra por usuario id
router.get("/compra-detalle/mis-detalles", verifyToken, getCompraDetalleByIdUser);

export default router;