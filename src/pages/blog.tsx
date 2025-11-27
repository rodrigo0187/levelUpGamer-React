import React, { useEffect, useState } from "react";
import "../assets/css/stylesheet-blog.css";

// ===========================
// TIPOS
// ===========================
type FeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  timestamp: number;
  source: string;
  image: string;
};

// ===========================
// CONFIGURACIÓN
// ===========================
const RSS_FEEDS = [
  "https://feeds.ign.com/ign/all",
  "https://www.levelup.com/rss/news",
  "https://kotaku.com/rss",
  "https://www.3djuegos.com/feeds/rss",
  "https://www.eurogamer.net/feed",
];

const PLACEHOLDER =
  "https://placehold.co/800x500/1a1a2e/58ff33?text=Level+Up+News";

// ===========================
// UTILIDADES
// ===========================
function extractImageFromDescription(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

async function fetchFeed(url: string): Promise<FeedItem[]> {
  try {
    const resp = await fetch(`http://localhost:3001/api/rss?url=${encodeURIComponent(url)}`);
    if (!resp.ok) throw new Error("Error al obtener RSS");

    const data = await resp.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, "application/xml");
    const items = Array.from(xml.querySelectorAll("item"));

    const sourceHost = new URL(url).hostname.replace("www.", "");

    return items.map((it) => {
      const title = it.querySelector("title")?.textContent?.trim() || "Sin título";
      const link = it.querySelector("link")?.textContent?.trim() || "#";
      const description = it.querySelector("description")?.textContent?.trim() || "";
      const pubDate = it.querySelector("pubDate")?.textContent?.trim() || "";

      const media =
        it.getElementsByTagNameNS("*", "content")[0]?.getAttribute("url") ||
        it.querySelector("enclosure")?.getAttribute("url") ||
        extractImageFromDescription(description) ||
        PLACEHOLDER;

      const timestamp = pubDate ? new Date(pubDate).getTime() : 0;

      return { title, link, description, pubDate, timestamp, source: sourceHost, image: media };
    });
  } catch (err) {
    console.warn("fetchFeed error", url, err);
    return [];
  }
}

// ===========================
// COMPONENTE
// ===========================
const Blog: React.FC = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Blog & Noticias Gamer - Level Up Gamer";

    let cancelled = false;

    const loadFeeds = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(RSS_FEEDS.map(fetchFeed));
        const merged = results.flat().sort((a, b) => b.timestamp - a.timestamp).slice(0, 12);
        if (!cancelled) setItems(merged);
      } catch {
        if (!cancelled) setError("No se pudieron cargar las noticias.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadFeeds();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page-container profileblog">
      <section className="hero-section">
        <div className="container text-center">
          <h1 className="display-3 fw-bold">Blog & Noticias Gamer</h1>
          <p className="display-6">Novedades, guías y tips gamer actualizados.</p>
        </div>
      </section>

      <main className="container py-4">
        {loading && <p className="muted">Cargando noticias...</p>}
        {error && <p className="text-danger">{error}</p>}

        <section id="news-list" className="news-grid">
          {items.map((item, idx) => (
            <article className="news-card" key={idx}>
              <div className="news-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER)}
                />
              </div>

              <div className="news-body">
                <h2 className="news-title">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h2>

                <p className="meta small">
                  Fecha: {item.pubDate ? new Date(item.pubDate).toLocaleDateString("es-ES") : "Desconocida"} •{" "}
                  <span className="source">{item.source}</span>
                </p>

                <p className="excerpt">
                  {item.description.replace(/(<([^>]+)>)/gi, "").slice(0, 200)}...
                </p>

                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Leer más →
                </a>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Blog;
