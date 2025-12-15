import React, { useState, useEffect } from "react";
import "../assets/css/stylesheet-inicio-sesion.css";
import icoLogo from "../assets/img/icon/LOGO.ico";
import { useLoginusuario } from "../Hooks/useLoginUsuario";
import { isBlockedAccountError } from "../types/errors";

const InicioSesion: React.FC = () => {
  useEffect(() => {
    document.title = "Inicio de sesión - Level Up Gamer";
  }, []);

  const { login, loading } = useLoginusuario();

  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [blockedAccountInfo, setBlockedAccountInfo] = useState<{
    message: string;
    reason: string;
    supportEmail: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setBlockedAccountInfo(null);

    if (!email || !psw) {
      setErrorMsg("Por favor completa todos los campos.");
      return;
    }

    if (psw.length < 4 || psw.length > 10) {
      setErrorMsg("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    try {
      const result = await login(email, psw);

      if (result) {
        const nombreFormateado =
          result.usuario.nombre.charAt(0).toUpperCase() +
          result.usuario.nombre.slice(1);

        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({
          ...storedUser,
          nombre: nombreFormateado
        }));

        alert(`Bienvenido ${nombreFormateado}`);
        window.location.href = "/perfil"; // Ajusta según tu router
      }
    } catch (err: any) {
      if (isBlockedAccountError(err)) {
        setBlockedAccountInfo({
          message: err.message,
          reason: err.reason,
          supportEmail: err.supportEmail,
        });
      } else {
        // Mostrar mensaje de error genérico o del backend
        setErrorMsg(err.message || "Error de conexión con el servidor.");
      }
    }
  };

  const handleContactSupport = () => {
    // Redirigir a la página de soporte
    window.location.href = "/soporte";
  };

  const handleCancel = () => {
    setEmail("");
    setPsw("");
    setErrorMsg("");
    setBlockedAccountInfo(null);
  };

  return (
    <div className="inicio-sesion-page">
      <div className="login-container">
        {/* Avatar */}
        <div className="imgcontainer">
          <img src={icoLogo} alt="Avatar" className="avatar" />
        </div>

        {/* Alerta de Cuenta Bloqueada */}
        {blockedAccountInfo && (
          <div className="alert alert-warning" style={{ margin: "10px 0", padding: "10px", backgroundColor: "#fff3cd", color: "#856404", border: "1px solid #ffeeba", borderRadius: "5px" }}>
            <h4 className="alert-heading" style={{ margin: "0 0 10px 0", fontSize: "1.1rem" }}>
              ⚠️ {blockedAccountInfo.message}
            </h4>
            <p style={{ margin: "0 0 10px 0" }}>{blockedAccountInfo.reason}</p>
            <hr style={{ borderTop: "1px solid #ffeeba" }} />
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleContactSupport}
              style={{ padding: "5px 10px", marginTop: "5px", cursor: "pointer" }}
            >
              ✉️ Contactar Soporte
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <b>Nombre de usuario</b>
          </label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@dominio.cl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label htmlFor="psw">
            <b>Contraseña</b>
          </label>
          <input
            type="password"
            id="psw"
            placeholder="Ingresa tu contraseña"
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
            required
            disabled={loading}
          />

          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          {/* Botones centrados */}
          <div className="btn-group">
            <button type="submit" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </button>
            <button type="button" className="cancelbtn" onClick={handleCancel} disabled={loading}>
              Cancelar
            </button>
          </div>

          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <label>
              <input type="checkbox" defaultChecked /> Recuérdame
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
