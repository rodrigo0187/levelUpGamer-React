// useLoginUsuario
import { useState } from "react";
import { API_URL } from "../Hooks/api";

export function useLoginusuario() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState<string | null>(null);

    const login = async (email: string, psw: string) => {
        setloading(true);
        seterror(null);

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: psw }) // Frontend still calls it psw locally in hook arg, but sends 'password'
            });

            const data = await res.json();
            // console.log("Respuesta del login:", data); // solo test para ver que llega desde el navegador

            if (!res.ok) {
                throw new Error(data.message || "Error al iniciar sesión");
            }

            // Guardo el usuario + token correctamente
            localStorage.setItem("user", JSON.stringify({
                id: data.usuario.id,
                nombre: data.usuario.nombre,
                email: data.usuario.email,
                role: data.usuario.role,
                token: data.token
            }));

            return data;

        } catch (err: any) {
            seterror(err.message);
            return null;
        } finally {
            setloading(false);
        }
    };

    return { login, loading, error };
}
