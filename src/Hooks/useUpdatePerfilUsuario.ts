import { useState } from "react";

import { API_URL } from "../Hooks/api";

export function updatePerfilUsuario() {
    const [loading, setloading] = useState(false);

    const updatePerfil = async (update: any) => {
        setloading(true);
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = user.token;

<<<<<<< HEAD
        const res = await fetch(`${API_URL}/perfil`, {
            method: "PUT",
=======
        const res = await fetch(`${API_URL}/perfil`,{
            method :"PUT",
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(update)
        });
        const data = await res.json();
        setloading(false);
        return data;
    };
    return { updatePerfil, loading };
}