import { Router } from "express";
import { AdminUsuariosController } from "../controllers/admin/usuarios.controller";
import verifyToken from "../middlewares/verifyToken";
import verifyAdmin from "../middlewares/verifyAdmin";

const router = Router();
router.use(verifyToken, verifyAdmin);
// metodo get
router.get("/", AdminUsuariosController.getAllUsers);
// metodo put
router.put("/:id", AdminUsuariosController.Update);


export default router;
