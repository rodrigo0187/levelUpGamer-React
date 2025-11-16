import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../assets/css/stylesheet-nav-bar-custom.css"
import "../assets/css/stylesheet-perfil.css"
import "../assets/css/stylesheet-footer.css"

const Perfil: React.FC = () => {
  // Datos de ejemplo (después podemos conectarlos a un backend)
  const [username, setUsername] = useState("Usuario");
  const [email, setEmail] = useState("usuario@correo.com");
  const [avatar, setAvatar] = useState("/img/icon/LOGO.ico");
  const [posts, setPosts] = useState<string[]>([]);

  // Simulación de carga de datos del perfil
  useEffect(() => {
    // datos simulados para historial
    setPosts([
      "Comentario en: Review de teclados mecánicos",
      "Compra realizada: Mouse Gamer RGB",
      "Accedió a su cuenta desde un nuevo dispositivo",
    ]);
  }, []);

  const logout = () => {
    alert("Sesión cerrada");
  };

  return (
    <>
      <Navbar />

      <main className="container my-5 pt-5">
        <div className="card mx-auto shadow p-4" style={{ maxWidth: "600px" }}>
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

          {/* Botones */}
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
          <ul className="list-group list-group-flush">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <li key={index} className="list-group-item">
                  {post}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">
                No hay actividad registrada
              </li>
            )}
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Perfil;
