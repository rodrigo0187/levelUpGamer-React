import { useState, useEffect } from "react";
import  {API_URL} from "../Hooks/api";
export function useProducto(id: number) {
  const [producto, setProducto] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducto() {
      try {
        const res = await fetch(`${API_URL}/productos/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");

        const data = await res.json();
        setProducto(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducto();
  }, [id]);

  return { producto, loading, error };
}
