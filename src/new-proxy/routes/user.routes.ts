import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

// Rutas admin
router.get("/users", UsuariosController.getAllUsers);
router.get("/users/:id", UsuariosController.getUserById);
router.put("/users/:id", UsuariosController.updateUser);
router.delete("/users/:id", UsuariosController.deleteUser);

// Rutas usuario autenticado
router.get("/me", verifyToken, UsuariosController.getMyProfile);
router.put("/me", verifyToken, UsuariosController.updateMyProfile);

export default router;
