import { useState, useEffect } from "react";


import  {API_URL} from "../Hooks/api";
export function useProductos() {
    const [productos, setproductos] = useState<any[]>([]);
    const [loading, setloading] = useState(true);

    const [error, seterror] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProductos() {
            try {
                const res = await fetch(`${API_URL}/productos`);
                if (!res.ok)
                    throw new Error("Error al obtener el producto");

                const data = await res.json();
                setproductos(data);
            } catch (err: any) {
                seterror(err.message);
            } finally {
                setloading(false);
            }
        }
        fetchProductos();
    }, []);
    return { productos, loading, error };

}