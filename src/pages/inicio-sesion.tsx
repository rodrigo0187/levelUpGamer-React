import React, { useState, useEffect } from "react";
import "../assets/css/stylesheet-inicio-sesion.css";

interface Usuario {
  nombre: string;
  email: string;
  psw: string;
}

const InicioSesion: React.FC = () => {
  useEffect(() => {
    document.title = "Inicio de sesión - Level Up Gamer";
  }, []);

  const [email, setEmail] = useState("");
  const [psw, setPsw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !psw) {
      setErrorMsg("Por favor completa todos los campos.");
      return;
    }

    if (psw.length < 4 || psw.length > 10) {
      setErrorMsg("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    try {
      const resp = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, psw }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErrorMsg(data.error || "Usuario o contraseña incorrecta.");
        return;
      }

      const nombreFormateado =
        data.usuario.nombre.charAt(0).toUpperCase() + data.usuario.nombre.slice(1);

      // Guardar solo para mantener sesión en el navegador actual
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.usuario, nombre: nombreFormateado })
      );

      alert(`Bienvenido ${nombreFormateado}`);
      window.location.href = "/perfil"; // Ajusta según tu router

    } catch (err) {
      setErrorMsg("Error de conexión con el servidor.");
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPsw("");
    setErrorMsg("");
  };

  return (
    <div className="inicio-sesion-page">
      <div className="login-container">

        {/* Avatar */}
        <div className="imgcontainer">
          <img src="/img/icon/LOGO.ico" alt="Avatar" className="avatar" />
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email"><b>Nombre de usuario</b></label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@dominio.cl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="psw"><b>Contraseña</b></label>
          <input
            type="password"
            id="psw"
            placeholder="Ingresa tu contraseña"
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
            required
          />

          {errorMsg && <p className="error-msg">{errorMsg}</p>}

          {/* Botones centrados */}
          <div className="btn-group">
            <button type="submit">Ingresar</button>
            <button type="button" className="cancelbtn" onClick={handleCancel}>Cancelar</button>
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
