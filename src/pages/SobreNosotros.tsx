import React from "react";
import "../assets/css/stylesheet-sobre-nosotros.css"
const SobreNosotros: React.FC = () => {
  return (
    <div className="profilesobrenosotros">


      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="display-3 fw-bold">Sobre Nosotros</h1>
          <p className="display-6">
            Aprende más sobre nuestros objetivos y quienes somos.
          </p>
        </div>
      </section>

      {/* Tarjetas */}
      <div className="row m-0 p-3">
        {/* Card 1 */}
        <div className="column">
          <div className="card h-100">
            <img src="/img/imgHero1.jpg" alt="Quienes Somos" style={{ width: "100%" }} />
            <div className="container">
              <h2>¿Quiénes Somos?</h2>
              <p>
                Level-Up Gamer es una tienda online dedicada a satisfacer las
                necesidades de los entusiastas de los videojuegos en Chile.
                Lanzada hace dos años como respuesta a la creciente demanda
                durante la pandemia, ofrece una amplia gama de productos para gamers,
                desde consolas y accesorios hasta computadores y sillas especializadas.
                Aunque no cuenta con una ubicación física, realiza despachos a todo el país.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="column">
          <div className="card h-100">
            <img src="/img/imgHero2.jpg" alt="Misión" style={{ width: "100%" }} />
            <div className="container">
              <h2>Misión</h2>
              <p>
                Proporcionar productos de alta calidad para gamers en todo Chile,
                ofreciendo una experiencia de compra única y personalizada,
                con un enfoque en la satisfacción del cliente y el crecimiento
                de la comunidad gamer.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="column">
          <div className="card h-100">
            <img src="/img/imgHero3.jpg" alt="Visión" style={{ width: "100%" }} />
            <div className="container">
              <h2>Visión</h2>
              <p>
                Ser la tienda online líder en productos para gamers en Chile,
                reconocida por su innovación, servicio al cliente excepcional y por
                un programa de fidelización basado en gamificación que recompense a
                nuestros clientes más fieles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;
