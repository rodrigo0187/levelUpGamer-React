export interface IUsuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string; // opcional en respuestas
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
}
