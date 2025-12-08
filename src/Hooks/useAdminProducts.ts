import { useState, useEffect, useCallback } from "react";
import { API_URL } from "./api";

export function useAdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = JSON.parse(localStorage.getItem("user") || "{}").token;

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/productos`); // Public endpoint usually
            if (!res.ok) throw new Error("Error fetching products");
            const data = await res.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteProduct = async (id: number) => {
        if (!confirm("¿Eliminar producto?")) return;
        try {
            const res = await fetch(`${API_URL}/productos/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Error deleting product");
            setProducts(products.filter(p => p.id !== id));
        } catch (err: any) {
            alert(err.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, deleteProduct, fetchProducts };
}
