import { useState } from "react";
import  {API_URL} from "../Hooks/api";

export function useCrearProducto() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crearProducto = async (producto: any, token: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(producto)
      });

      if (!res.ok) throw new Error("Error al crear producto");

      return await res.json();
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { crearProducto, loading, error };
}
