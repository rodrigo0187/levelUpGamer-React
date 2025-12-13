import { Router } from "express";
import { AdminUsuariosController } from "../controllers/admin/usuarios.controller";
import verifyAdmin from "../middlewares/verifyAdmin";

const router = Router();

router.use(verifyAdmin);

router.get("/", AdminUsuariosController.getAllUsers);
router.get("/:id", AdminUsuariosController.Update);


export default router;
