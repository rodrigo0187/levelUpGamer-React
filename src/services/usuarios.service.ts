import bcrypt from "bcryptjs";
import { UsuariosRepository } from "../repositories/usuarios.repositories";
import type { IUsuario } from "../interfaces/IUsuario";
import type { UsuarioUpdate } from "../interfaces/UsuarioUpdate";

export class UsuariosService {
  static async getAll(): Promise<IUsuario[]> {
    return UsuariosRepository.getAll();
  }

  static async getById(id: number): Promise<IUsuario | null> {
    return UsuariosRepository.getById(id);
  }

  static async create(usuario: IUsuario & { password: string }): Promise<number> {
    const hashedPassword = await bcrypt.hash(usuario.password, 10);
    return UsuariosRepository.create({ ...usuario, password: hashedPassword });
  }

  static async updateById(id: number, data: Partial<UsuarioUpdate>): Promise<boolean> {
    return UsuariosRepository.updateById(id, data);
  }

  static async deleteById(id: number): Promise<boolean> {
    return UsuariosRepository.deleteById(id);
  }
}
