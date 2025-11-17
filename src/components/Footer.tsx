import React from "react";
import "../Footer.css"; // tu archivo de estilos

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row">
          {/* Columna 1 */}
          <div className="col-md-4">
            <h5>
              <i className="bi bi-controller"></i> Level-Up
            </h5>
            <p>Tu tienda de confianza para productos gaming de la más alta calidad.</p>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-md-4">
            <h5>Enlaces rápidos</h5>
            <ul className="footer-links">
              <li><a href="/" className="none">Home</a></li>
              <li><a href="/productos" className="none">Productos</a></li>
              <li><a href="/sobre-nosotros" className="none">Sobre Nosotros</a></li>
              <li><a href="/blogs" className="none">Contacto</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-md-4">
            <h5>Contacto</h5>
            <ul className="footer-links">
              <li>
                <a href="https://maps.app.goo.gl/LA3bMz4KLmiopUho9" className="bi bi-geo-alt-fill">
                  &nbsp;Av. Paicaví 3280, Concepción, Chile
                </a>
              </li>
              <li>
                <a href="mailto:999leveluptienda@gmail.com" className="bi bi-envelope-at-fill">
                  &nbsp;999leveluptienda@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+56912345678" className="bi bi-telephone-fill">
                  &nbsp;+56 9 1234 5678
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/999leveluptienda"
                  className="bi bi-instagram"
                >
                  &nbsp;Instagram
                </a>
              </li>
            </ul>
          </div>

          <hr className="mt-4" />

          <div className="text-center">
            <small>&copy; 2025 Level-Up. Todos los derechos reservados</small>
            <ul className="list-inline mt-2">
              <li className="list-inline-item">
                <a href="/terminos-y-privacidad" className="text-white me-3">
                  <i>Privacidad</i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/terminos-y-condiciones" className="text-white me-3">
                  <i>Términos</i>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
