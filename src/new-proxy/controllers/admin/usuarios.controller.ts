// controller usuario admin
import type { Request, Response } from "express";

import { UsuariosService } from "../../../services/usuarios.service";

export class AdminUsuariosController {

    static async getAllUsers(req: Request, res: Response) {
        try {
            const user = await UsuariosService.getAll();
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: "Error al obtener usuarios." });

        }
    }
    static async Update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { activo, role, telefono, avatar } = req.body;
            const updated = await UsuariosService.updateById(id, {
                activo, role, telefono, avatar
            });
            if (!updated) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }
            res.json({ message: "Usuario actualizado correctamente." });

        } catch (err) {
            res.status(500).json({ message: "Error al actualizar usuario." });
        }
    }
}
