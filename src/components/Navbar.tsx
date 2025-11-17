import { useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../assets/css/stylesheet-nav-bar-custom.css"; // ajusta la ruta si tu css está en otra carpeta
import logo from "../assets/img/icon/LOGO.ico";

export default function Navbar() {
  useEffect(() => {
    // Si tienes funciones como logout(), deben venir de otro lado.
    // Aquí eliminamos scripts inline.
  }, []);

  return (
    <nav className="navbar navbar-expand-sm bg-success navbar-dark fixed-top">
      <div className="container-fluid">
        <img
          src={logo}
          alt="Avatar Logo"
          style={{ width: "100px" }}
          className="rounded-pill"
        />
        <a className="navbar-brand" style={{ paddingLeft: "1%" }} href="/">
          Level-up Gamer
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item mx-1">
              <a className="nav-link" href="/">
                <i className="fa fa-fw fa-home"></i>Home
              </a>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link" href="/productos">Productos</a>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link" href="/soporte">Soporte</a>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link" href="/blog">Blogs</a>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link" href="/sobre-nosotros">Sobre Nosotros</a>
            </li>

            <li className="nav-item mx-1">
              <a className="nav-link" href="/registro">Registro</a>
            </li>

            {/* Iniciar sesión */}
            <li className="nav-item mx-1">
              <a className="nav-link" href="/inicio_sesion">Iniciar sesión</a>
            </li>

            {/* Usuario logueado — esto luego lo reemplazamos con React state */}
            <li className="nav-item mx-1" style={{ display: "none" }}>
              <a className="nav-link" href="/perfil">
                <i className="fa fa-fw fa-user"></i>
                <span> Usuario</span>
              </a>
            </li>

            {/* Cerrar sesión */}
            <li className="nav-item mx-1" style={{ display: "none" }}>
              <a className="nav-link" href="#">Cerrar sesión</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
