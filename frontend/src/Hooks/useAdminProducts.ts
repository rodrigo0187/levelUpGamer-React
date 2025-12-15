import { useState, useEffect, useCallback } from "react";
import { API_URL } from "./api";

export function useAdminProducts() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = JSON.parse(localStorage.getItem("user") || "{}").token;

    const fetchProducts = useCallback(async (sortBy: 'id' | 'created_at' = 'id', order: 'ASC' | 'DESC' = 'ASC') => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/productos?sortBy=${sortBy}&order=${order}`);
            if (!res.ok) throw new Error("Error fetching products");
            const data = await res.json();
            setProducts(data);
        } catch (err: any) {
            console.error("Fetch error:", err);
            if (err.message.includes("Failed to fetch")) {
                setError("No se pudo conectar con el servidor (Backend/Base de Datos inactiva).");
            } else {
                setError(err.message || "Error desconocido al cargar productos");
            }
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

    const createProduct = async (productData: any) => {
        try {
            const res = await fetch(`${API_URL}/productos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            if (!res.ok) throw new Error("Error creating product");
            await fetchProducts();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const updateProduct = async (id: number, productData: any) => {
        try {
            const res = await fetch(`${API_URL}/productos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
            if (!res.ok) throw new Error("Error updating product");
            await fetchProducts();
        } catch (err: any) {
            alert(err.message);
        }
    };

    return { products, loading, error, deleteProduct, fetchProducts, createProduct, updateProduct };
}
