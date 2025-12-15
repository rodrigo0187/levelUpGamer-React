import { useState, useEffect } from "react";

import { API_URL } from "../Hooks/api";
export function userPerfilUsuario() {
    const [perfil, setperfil] = useState<any>(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = user.token;

        async function fetchPerfil() {
            try {
                const res = await fetch(`${API_URL}/perfil`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("No autorizado");
                const data = await res.json();
                setperfil(data);
            } catch (err) {
                console.error(err);
            } finally {
                setloading(false);
            }
        }
        fetchPerfil();

    }, []);
    return { perfil, loading };
}