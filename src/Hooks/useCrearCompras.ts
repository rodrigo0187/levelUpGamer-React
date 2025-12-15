// POST
import { useState } from "react";
import { API_URL } from "./api";

export function useCrearCompras() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //post
    const crearCompras = async (total: Number) => {
        setLoading(true);
        setError(null);

<<<<<<< HEAD
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const token = user.token;
            const res = await fetch(`${API_URL}/compras`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
=======
        try{
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/compras`,{
                method :"POST",
                headers :{
                    "content-type":"application/json",
                    "Authorization":'Bearer ${token}'
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
                },
                body: JSON.stringify({ total })
            });
            if (!res.ok)
                throw new Error("Error al crear compra");
            return await res.json();
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { crearCompras, loading, error };
}