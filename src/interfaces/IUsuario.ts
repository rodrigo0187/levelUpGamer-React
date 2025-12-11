export interface IUsuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string; // Standardized from 'psw'
  telefono?: string | null;
  role?: string;
  activo?: boolean; // 1 = active, 0 = blocked
  created_at?: Date;
  updated_at?: Date;
}
