import React, { useEffect } from "react";
import "../assets/css/stylesheet-sobre-nosotros.css";

// Imágenes
import imgHero1 from "../assets/img/imgHero1.jpg";
import imgHero2 from "../assets/img/imgHero2.jpg";
import imgHero3 from "../assets/img/imgHero3.jpg";

const SobreNosotros: React.FC = () => {
  useEffect(() => {
    document.title = "Sobre Nosotros - Level Up Gamer";
  }, []);
  const tarjetas = [
    {
      titulo: "¿Quiénes Somos?",
      img: imgHero1,
      texto: `Level-Up Gamer es una tienda online dedicada a satisfacer las
      necesidades de los entusiastas de los videojuegos en Chile. Lanzada
      hace dos años durante la pandemia, ofrece una amplia gama de productos
      para gamers desde consolas hasta sillas especializadas.`
    },
    {
      titulo: "Misión",
      img: imgHero2,
      texto: `Proporcionar productos de alta calidad para gamers en todo Chile,
      ofreciendo una experiencia de compra única y personalizada,
      con un enfoque en la satisfacción del cliente y el crecimiento
      de la comunidad gamer.`
    },
    {
      titulo: "Visión",
      img: imgHero3,
      texto: `Ser la tienda online líder en productos para gamers en Chile,
      reconocida por su innovación, servicio al cliente excepcional y por
      un programa de fidelización basado en gamificación que recompense a
      nuestros clientes más fieles.`
    },
  ];

  return (
    <div className="profilesobrenosotros">
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <div className="container">
          <h1 className="display-3 fw-bold">Sobre Nosotros</h1>
          <p className="display-6">
            Aprende más sobre nuestros objetivos y quienes somos.
          </p>
        </div>
      </section>

      {/* Tarjetas */}
      <div className="container my-4">
        <div className="row g-4">
          {tarjetas.map((tarjeta, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
              <div className="card flex-fill h-100">
                <img src={tarjeta.img} alt={tarjeta.titulo} className="card-img-top" />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title">{tarjeta.titulo}</h2>
                  <p className="card-text flex-grow-1">{tarjeta.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
