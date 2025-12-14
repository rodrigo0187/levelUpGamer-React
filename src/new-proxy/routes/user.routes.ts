import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";

import verifyAdmin  from "../middlewares/verifyToken";

const router = Router();

// Rutas admin
router.get("/users", verifyAdmin, UsuariosController.getAllUsers);
router.get("/users/:id", verifyAdmin, UsuariosController.getUserById);
router.put("/users/:id", verifyAdmin, UsuariosController.updateUser);

export default router;
