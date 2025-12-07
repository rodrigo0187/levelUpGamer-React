import { useState } from "react";
import { API_URL } from '../Hooks/api';

export function useEliminarCompra() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eliminarCompra = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = user.token;

      const res = await fetch(`${API_URL}/compra/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Error al eliminar compra");

      return await res.json();

    } catch (err: any) {
      setError(err.message);
      return null;

    } finally {
      setLoading(false);
    }
  };

  return { eliminarCompra, loading, error };
}
