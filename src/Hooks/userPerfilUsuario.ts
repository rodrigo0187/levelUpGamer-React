import { useState, useEffect } from "react";

import  {API_URL} from "../Hooks/api";
export function userPerfilUsuario() {
    const [perfil, setperfil] = useState<any>(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        async function fetchPerfil() {
            try {
                const res = await fetch('$API_URL/perfil', {
                    headers: { Authorization: 'Bearer ${toke}' }
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