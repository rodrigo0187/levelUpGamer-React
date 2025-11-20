import { useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "../assets/img/icon/LOGO.ico";
import { Link } from "react-router-dom";

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
              <Link className="nav-link" to="/">
                <i className="fa fa-fw fa-home"></i>Home
              </Link>
            </li>

            <li className="nav-item mx-1">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>

            <li className="nav-item mx-1">
              <Link className="nav-link" to="/soporte">Soporte</Link>
            </li>

            <li className="nav-item mx-1">
              <Link className="nav-link" to="/blog">Blogs</Link>
            </li>

            <li className="nav-item mx-1">
              <Link className="nav-link" to="/sobre-nosotros">Sobre Nosotros</Link>
            </li>

            <li className="nav-item mx-1">
              <Link className="nav-link" to="/registro">Registro</Link>
            </li>

            {/* Iniciar sesión */}
            <li className="nav-item mx-1">
              <Link className="nav-link" to="/inicio_sesion">Iniciar sesión</Link>
            </li>

            {/* Usuario logueado — esto luego lo reemplazamos con React state */}
            <li className="nav-item mx-1" style={{ display: "none" }}>
              <Link className="nav-link" to="/perfil">
                <i className="fa fa-fw fa-user"></i>
                <span> Usuario</span>
              </Link>
            </li>

            {/* Cerrar sesión */}
            <li className="nav-item mx-1" style={{ display: "none" }}>
              <Link className="nav-link" to="#">Cerrar sesión</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
