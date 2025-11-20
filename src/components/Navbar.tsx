import { useEffect, useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from "../assets/img/icon/LOGO.ico";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-sm custom-navbar ${scrolled ? "scrolled" : ""} fixed-top`}>
      <div className="container-fluid">
        <img
          src={logo}
          alt="Avatar Logo"
          style={{ width: "100px" }}
          className="rounded-pill"
        />
        <Link className="navbar-brand ps-2" to="/">
          Level-up Gamer
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
          aria-controls="collapsibleNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-1">
              <Link className="nav-link" to="/">
                <i className="fa fa-fw fa-home"></i> Home
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
              <Link className="nav-link" to="/sobre-Nosotros">Sobre Nosotros</Link>
            </li>
            <li className="nav-item mx-1">
              <Link className="nav-link" to="/registro">Registro</Link>
            </li>
            <li className="nav-item mx-1">
              <Link className="nav-link" to="/inicio-sesion">Iniciar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
