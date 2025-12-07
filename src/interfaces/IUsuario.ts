export interface IUsuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string; // Standardized from 'psw'
  telefono?: string | null;
  role?: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
}
