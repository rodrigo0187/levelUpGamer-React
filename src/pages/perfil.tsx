import React, { useState, useEffect } from "react";
import "../assets/css/stylesheet-perfil.css";

interface Compra {
  producto: string;
  fecha: string;
}

interface Usuario {
  nombre: string;
  email: string;
  avatar?: string;
}

const Perfil: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario>({ nombre: "Usuario", email: "usuario@correo.com" });
  const [avatar, setAvatar] = useState("/img/icon/LOGO.ico");
  const [compras, setCompras] = useState<Compra[]>([]);
  const [historial, setHistorial] = useState<string[]>([]);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  // ===== Cargar perfil desde backend =====
  useEffect(() => {
    if (!token) {
      window.location.href = "/inicioSesion";
      return;
    }

    const fetchPerfil = async () => {
      try {
        const resp = await fetch("http://localhost:3001/api/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await resp.json();

        if (resp.ok) {
          const { usuario: u, compras: c } = data;
          setUsuario({ nombre: u.nombre, email: u.email, avatar: u.avatar });
          setAvatar(u.avatar || "/img/icon/LOGO.ico");
          setCompras(c || []);

          // Historial inicial
          const historialCompras = c?.map((compra: Compra) => `Compra realizada: ${compra.producto}`) || [];
          setHistorial([...historialCompras, "Accedió a su cuenta desde un nuevo dispositivo"]);

          // Guardar en localStorage
          localStorage.setItem("perfil", JSON.stringify({
            compras: c || [],
            historial: [...historialCompras, "Accedió a su cuenta desde un nuevo dispositivo"]
          }));
        } else {
          setError(data.message || "No se pudo cargar el perfil");
        }
      } catch (err) {
        console.error("Error de conexión al backend:", err);
        setError("Error de conexión con el servidor");
      }
    };

    fetchPerfil();
  }, [token]);

  // ===== Actualizar desde localStorage en tiempo real =====
  useEffect(() => {
    const updateFromStorage = () => {
      const storedPerfil = JSON.parse(localStorage.getItem("perfil") || "{}");
      if (storedPerfil.compras) setCompras(storedPerfil.compras);
      if (storedPerfil.historial) setHistorial(storedPerfil.historial);
    };

    // Ejecutar al inicio
    updateFromStorage();

    // Escuchar cambios periódicamente (cada 1s)
    const interval = setInterval(updateFromStorage, 1000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    alert("Sesión cerrada");
    window.location.href = "/inicioSesion";
  };

  return (
    <main className="profile-perfil-page">
      <div className="card shadow p-4">
        <div className="text-center">
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-circle mb-3"
            width={120}
            height={120}
          />
          <h2>{usuario.nombre}</h2>
          <p>{usuario.email}</p>
        </div>

        <hr />

        <div className="container d-flex justify-content-between">
          <a href="/ver-mi-perfil" className="btn btn-primary">
            Ver mi perfil
          </a>
          <button className="btn btn-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </div>

        <hr />

        {error && <p className="text-danger text-center">{error}</p>}

        <h5>Historial de actividad</h5>
        <ul id="userPosts" className="list-group">
          {historial.length > 0 ? (
            historial.map((post, index) => (
              <li key={index} className="list-group-item">{post}</li>
            ))
          ) : (
            <li className="list-group-item text-muted">No hay actividad registrada</li>
          )}
        </ul>

        <hr />

        <h5>Compras realizadas</h5>
        <ul id="userCompras" className="list-group">
          {compras.length > 0 ? (
            compras.map((c, index) => (
              <li key={index} className="list-group-item">
                {c.producto} - {c.fecha}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No hay compras registradas</li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default Perfil;
