import React, { useState, useEffect } from "react";
import "../assets/css/stylesheet-perfil.css";
import { API_URL } from "../Hooks/api";

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
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [avatar, setAvatar] = useState("/img/icon/LOGO.ico");
  const [compras, setCompras] = useState<Compra[]>([]);
  const [historial, setHistorial] = useState<string[]>([]);
  const [error, setError] = useState("");

  // usuario desde localStorage
  const userLS = JSON.parse(localStorage.getItem("user") || "null");

  //   CONTROL DE SESIÓN

  useEffect(() => {
    if (!userLS) {
      window.location.href = "/inicioSesion";
      return;
    }

    // Setear usuario base
    setUsuario({
      nombre: userLS.nombre,
      email: userLS.email,
      avatar: userLS.avatar,
    });

    setAvatar(userLS.avatar || "/img/icon/LOGO.ico");

    // Cargar datos desde backend
    fetchPerfil();
  }, []);

  //    OBTENER PERFIL BACKEND
  const fetchPerfil = async () => {
    try {
      const resp = await fetch(`${API_URL}/perfil`);

      if (!resp.ok) {
        setError("No se pudo cargar información del perfil");
        return;
      }

      const data = await resp.json();
      const comprasData: Compra[] = data.compras || [];

      setCompras(comprasData);

      const historialCompras = comprasData.map(
        (c) => `Compra realizada: ${c.producto}`
      );

      setHistorial([
        ...historialCompras,
        "Accedió a su cuenta desde un nuevo dispositivo",
      ]);
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  //          LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    alert("Sesión cerrada");
    window.location.href = "/inicio-sesion";
  };

  // Mientras carga usuario
  if (!usuario) {
    return (
      <main className="profile-perfil-page">
        <p className="text-center text-muted mt-5">Cargando perfil...</p>
      </main>
    );
  }


  //          UI

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

      {/* OFFCANVAS HISTORIAL */}
      <div
        className="offcanvas offcanvas-end text-white"
        tabIndex={-1}
        id="historialCanvas"
      >
        <div className="offcanvas-header">
          <h2 className="offcanvas-title">📝 Historial de Actividad</h2>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="list-group">
            {historial.length > 0 ? (
              historial.map((item, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">
                No hay actividad registrada
              </li>
            )}
          </ul>

          <hr />

          <h5>Compras realizadas</h5>
          <ul className="list-group">
            {compras.length > 0 ? (
              compras.map((c, i) => (
                <li key={i} className="list-group-item">
                  {c.producto} — {c.fecha}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">
                No hay compras registradas
              </li>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Perfil;
