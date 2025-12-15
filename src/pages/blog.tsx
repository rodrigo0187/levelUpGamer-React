import React, { useEffect } from "react";
import "../assets/css/stylesheet-blog.css";
import { useAdminBlog } from "../Hooks/useAdminBlog";

const Blog: React.FC = () => {
  const { posts, loading, error } = useAdminBlog();

  useEffect(() => {
    document.title = "Blog & Noticias Gamer - Level Up Gamer";
  }, []);

  const PLACEHOLDER = "https://placehold.co/800x500/1a1a2e/58ff33?text=Level+Up+News";

  return (
    <div className="page-container profileblog">
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="display-3 fw-bold">Blog & Noticias Gamer</h1>
          <p className="display-6">Novedades, guías y tips gamer actualizados.</p>
        </div>
      </section>

      <main className="container py-4">
        {loading && <p className="muted text-center py-5">Cargando noticias...</p>}
        {error && <p className="text-danger text-center">Error al cargar noticias: {error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-muted py-5">No hay noticias publicadas aún.</p>
        )}

        <section id="news-list" className="news-grid">
          {posts.map((item) => (
            <article className="news-card" key={item.id}>
              <div className="news-image-wrapper">
                <img
                  src={item.imagen || PLACEHOLDER}
                  alt={item.titulo}
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                />
              </div>

              <div className="news-body">
                <h2 className="news-title">
                  {item.titulo}
                </h2>

                <p className="meta small">
                  Fecha: {item.fecha ? new Date(item.fecha).toLocaleDateString("es-ES") : "Reciente"}
                </p>

                <p className="excerpt">
                  {item.contenido?.substring(0, 150)}...
                </p>
                <p>
                  <a href={`/blog/${item.id}`}>Leer más</a>
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Blog;
