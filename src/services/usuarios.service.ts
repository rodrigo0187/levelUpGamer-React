import bcrypt from "bcryptjs";
import { UsuariosRepository } from "../repositories/usuarios.repositories";
import type { IUsuario } from "../interfaces/IUsuario";

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

  static async updateById(id: number, data: Partial<IUsuario>): Promise<boolean> {
    return UsuariosRepository.updateById(id, data);
  }

  static async deleteById(id: number): Promise<boolean> {
    return UsuariosRepository.deleteById(id);
  }

  static async getMyProfile(userId: number): Promise<IUsuario | null> {
    return UsuariosRepository.getById(userId);
  }

  static async updateMyProfile(userId: number, data: Partial<IUsuario>): Promise<boolean> {
    return UsuariosRepository.updateById(userId, data);
  }
}
