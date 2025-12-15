export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    telefono?: string | null;
    activo: boolean;
    role: "admin" | "user";
    avatar?: string | null;
    created_at: string;
}