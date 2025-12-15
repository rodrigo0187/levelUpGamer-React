// useLoginUsuario
import { useState } from "react";
import { API_URL } from "../Hooks/api";

export function useLoginusuario() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState<string | null>(null);

    const login = async (email: string, psw: string) => {
        setloading(true);
        seterror(null);
<<<<<<< HEAD

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: psw })
=======
        try{
            // se realiza la peticion post al endpoint login
            const res = await fetch(`${API_URL}/login`,{
                method :"POST",
                headers : {"content-type":"aplication/json"},
                body : JSON.stringify({email , psw})
>>>>>>> 4a4a67a3595cbf8e3b4196907e39ecbf257f8c98
            });

            const data = await res.json();

            if (!res.ok) {
                // Si es error 403, es cuenta desactivada
                if (res.status === 403) {
                    throw {
                        type: "ACCOUNT_BLOCKED",
                        message: data.message,
                        reason: data.reason, // Se espera que venga del backend
                        supportEmail: "soporte@levelupgamer.cl" // Hardcoded o del backend si viene
                    };
                }

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
            seterror(err.message || "Error desconocido");
            throw err; // Re-lanzar para que el componente pueda manejar tipos específicos de error
        } finally {
            setloading(false);
        }
    };

    return { login, loading, error };
}
