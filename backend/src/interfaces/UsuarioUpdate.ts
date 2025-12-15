// interfaces/UsuarioUpdate.ts
export interface UsuarioUpdate {
    nombre?: string;
    email?: string;
    telefono?: string | null;
    role?: "admin" | "user";
    avatar?: string | null;
    activo?: boolean;
}
