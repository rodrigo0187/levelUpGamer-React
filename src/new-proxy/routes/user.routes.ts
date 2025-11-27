import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";

const router = Router();

// Rutas admin
router.get("/users", UsuariosController.getAllUsers);
router.get("/users/:id", UsuariosController.getUserById);
router.put("/users/:id", UsuariosController.updateUser);
router.delete("/users/:id", UsuariosController.deleteUser);

export default router;
