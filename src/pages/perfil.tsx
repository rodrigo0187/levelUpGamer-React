import React, { useState, useEffect } from "react";
import "../assets/css/stylesheet-perfil.css"

const Perfil: React.FC = () => {
  const [username, setUsername] = useState("Usuario");
  const [email, setEmail] = useState("usuario@correo.com");
  const [avatar, setAvatar] = useState("/img/icon/LOGO.ico");
  const [posts, setPosts] = useState<string[]>([]);
  const [compras, setCompras] = useState<string[]>([]); // Nuevo estado para compras

  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const resp = await fetch("http://localhost:3001/api/perfil", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await resp.json();

        if (resp.ok) {
          setUsername(data.usuario.nombre);
          setEmail(data.usuario.email);
          setAvatar(data.usuario.avatar || "/img/icon/LOGO.ico");
          setCompras(data.compras || []);
        } else {
          console.error("Error al obtener perfil:", data.message);
        }
      } catch (err) {
        console.error("Error de conexión al backend:", err);
      }
    };

    fetchPerfil();

    // Datos de ejemplo para historial
    setPosts([
      "Comentario en: Review de teclados mecánicos",
      "Compra realizada: Mouse Gamer RGB",
      "Accedió a su cuenta desde un nuevo dispositivo",
    ]);
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
          <h2>{username}</h2>
          <p>{email}</p>
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

        <h5>Historial de actividad</h5>
        <ul id="userPosts">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <li key={index} className="list-group-item">{post}</li>
            ))
          ) : (
            <li className="list-group-item text-muted">No hay actividad registrada</li>
          )}
        </ul>

        <hr />

        <h5>Compras realizadas</h5>
        <ul id="userCompras">
          {compras.length > 0 ? (
            compras.map((compra, index) => (
              <li key={index} className="list-group-item">{compra}</li>
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
