// Ejemplo de cómo usar el error de cuenta bloqueada en tu componente de login

import { useLoginusuario } from "../Hooks/useLoginUsuario";
import { isBlockedAccountError } from "../types/errors";
import { useState } from "react";

export function LoginExample() {
    const { login, loading, error } = useLoginusuario();
    const [blockedAccountInfo, setBlockedAccountInfo] = useState<{
        message: string;
        reason: string;
        supportEmail: string;
    } | null>(null);

    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await login(email, password);

            if (result) {
                // Login exitoso - redirigir
                window.location.href = "/dashboard";
            }
        } catch (err: any) {
            // Verificar si es error de cuenta bloqueada
            if (isBlockedAccountError(err)) {
                setBlockedAccountInfo({
                    message: err.message,
                    reason: err.reason,
                    supportEmail: err.supportEmail
                });
            } else {
                // Otro tipo de error
                console.error("Error de login:", err.message);
            }
        }
    };

    // Función para abrir email de soporte
    const handleContactSupport = () => {
        if (!blockedAccountInfo) return;

        const subject = encodeURIComponent("Solicitud de Reactivación de Cuenta");
        const body = encodeURIComponent(
            `Hola equipo de Level Up Gamer,\n\n` +
            `Mi cuenta ha sido desactivada y solicito amablemente su reactivación.\n\n` +
            `Gracias,\n` +
            `[Tu nombre]`
        );

        window.location.href = `mailto:${blockedAccountInfo.supportEmail}?subject=${subject}&body=${body}`;
    };

    return (
        <div>
            {/* Modal o Alert para cuenta bloqueada */}
            {blockedAccountInfo && (
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">
                        <i className="fa fa-exclamation-triangle"></i> {blockedAccountInfo.message}
                    </h4>
                    <p>{blockedAccountInfo.reason}</p>
                    <hr />
                    <button
                        className="btn btn-primary"
                        onClick={handleContactSupport}
                    >
                        <i className="fa fa-envelope"></i> Contactar Soporte
                    </button>
                </div>
            )}

            {/* Resto del formulario de login */}
            {/* ... */}
        </div>
    );
}
