import { useState } from "react";

import { API_URL } from "./api";

export function useEliminarProducto() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const eliminarProducto = async (id: Number, token: string) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_URL}/productos/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error("Error al eliminar el producto");
            return await res.json();
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { eliminarProducto, loading, error };
}