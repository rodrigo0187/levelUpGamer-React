export interface UsuarioAdminPayload {
    id: number;
    nombre: string;
    email: string;
    telefono?: string | null;
    role: "admin" | "user";
    avatar?: string | null;
    activo: boolean;
}