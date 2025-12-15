<<<<<<< HEAD
// controller usuario normal
=======
// db usuario
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
import type { Request, Response } from "express";
import { UsuariosService } from "../../services/usuarios.service";

export class UsuariosController {

  static async getAllUsers(req: Request, res: Response) {
    try {
      const data = await UsuariosService.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener usuarios" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await UsuariosService.getById(id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener usuario" });
    }
  }

  /**
   * Actualiza datos del usuario
   * Se usa para:
   * - activar / desactivar (activo)
   * - cambiar role
   * - actualizar telefono / avatar
   */
  static async updateUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { activo, role, telefono, avatar } = req.body;

      const success = await UsuariosService.updateById(id, {
        activo,
        role,
        telefono,
        avatar
      });

      if (!success) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json({ message: "Usuario actualizado correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al actualizar usuario" });
    }
  }
}
