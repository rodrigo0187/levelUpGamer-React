// perfil.controller.ts
import type { Request, Response } from "express";
import { PerfilService } from "../../services/perfil.service";

export const getMyProfile = async (req: Request & { user?: { id: number } }, res: Response) => {
  try {
    const perfil = await PerfilService.getMyProfile(req.user!.id);
    res.json(perfil);
  } catch (err) {
    console.error("Error al obtener perfil:", err);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};

export const updateMyProfile = async (req: Request & { user?: { id: number } }, res: Response) => {
  try {
    const success = await PerfilService.updateMyProfile(req.user!.id, req.body);
    if (!success) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Perfil actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};
