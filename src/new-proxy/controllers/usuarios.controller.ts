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
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener usuario" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const success = await UsuariosService.updateById(id, req.body);
      if (!success) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json({ message: "Usuario actualizado correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al actualizar usuario" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const success = await UsuariosService.deleteById(id);
      if (!success) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al eliminar usuario" });
    }
  }

  static async getMyProfile(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const perfil = await UsuariosService.getMyProfile(userId);
      res.json(perfil);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener perfil" });
    }
  }

  static async updateMyProfile(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const success = await UsuariosService.updateMyProfile(userId, req.body);
      res.json({ message: "Perfil actualizado correctamente" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al actualizar perfil" });
    }
  }
}
