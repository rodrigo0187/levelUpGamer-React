export interface AdminUser {
    id: number;
    nombre: string;
    email: string;
    role: "admin" | "user";
    telefono?: string | null;
    activo: boolean;
    avatar?: string | null;
    created_at?: string;
}
