export interface Compra {
  id: number;
  id_usuario: number;
  estado: "pending" | "completed" | "cancelled";
  total: number;
  fecha: string; // timestamp
}
