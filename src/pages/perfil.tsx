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

  const token: string | undefined = JSON.parse(localStorage.getItem("user") || "{}")?.token;

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

          const historialCompras: string[] = c?.map((compra: Compra) => `Compra realizada: ${compra.producto}`) || [];
          setHistorial([...historialCompras, "Accedió a su cuenta desde un nuevo dispositivo"]);
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

        <button
          className="btn btn-success mt-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#historialCanvas"
        >
          Ver Historial
        </button>
      </div>

      {/* Offcanvas Historial */}
      <div className="offcanvas offcanvas-end text-white" tabIndex={-1} id="historialCanvas">
        <div className="offcanvas-header">
          <h2 className="offcanvas-title">📝 Historial de Actividad</h2>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="list-group">
            {historial.length > 0 ? (
              historial.map((post: string, index: number) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {post}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No hay actividad registrada</li>
            )}
          </ul>

          <hr />

          <h5>Compras realizadas</h5>
          <ul className="list-group">
            {compras.length > 0 ? (
              compras.map((c: Compra, index: number) => (
                <li key={index} className="list-group-item">
                  {c.producto} - {c.fecha}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">No hay compras registradas</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Perfil;
