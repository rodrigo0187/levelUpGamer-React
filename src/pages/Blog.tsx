import React from "react";

import "../css/bootstrap.min.css";
import "../css/stylesheet-general.css";
import "../css/stylesheet-blog.css";
import "../css/stylesheet-navbar.css";
import "../css/stylesheet-footer.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Blog() {
  return (
    <div className="page-container profileblog">
      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <h1 className="display-3 fw-bold">Blog & Noticias Gamer</h1>
          <p className="display-6">
            Novedades, guías y consejos para mejorar tu experiencia de juego.
          </p>
        </div>
      </section>

      {/* CONTENEDOR DE NOTICIAS */}
      <section id="news-container" aria-live="polite">
        {/* Ejemplo estático (puedes reemplazarlo luego con posts dinámicos) */}
        <article className="news-item mb-4 p-3 border rounded">
          <h2 className="h5">
            <a
              href="#"
              className="news-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Título de ejemplo: Lanzamiento XYZ
            </a>
          </h2>

          <p className="meta text-muted small">
            Publicado:{" "}
            <time dateTime="2025-09-11">11 Sept 2025</time> • Fuente:{" "}
            <span className="source">Ejemplo</span>
          </p>

          <p className="excerpt">
            Resumen breve de la noticia o guía. Aquí irá un extracto para captar
            la atención del lector...
          </p>

          <a href="#" className="read-more">
            Leer más →
          </a>
        </article>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
