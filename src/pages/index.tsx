import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../assets/css/stylesheet-nav-bar-custom.css";
import "../assets/css/stylesheet-index.css";
import "../assets/css/stylesheet-footer.css";


import Slide9 from "../assets/img/CarouselSlide9.jpg";
import Slide1 from "../assets/img/CarouselSlide1.jpg";
import Slide10 from "../assets/img/CarouselSlide10.jpg";
import Slide7 from "../assets/img/CarouselSlide7.jpg";
import Slide8 from "../assets/img/CarouselSlide8.jpg";
import Slide5 from "../assets/img/CarouselSlide5.jpg";


// categorias 
import JuegosMesa from "../assets/img/categorias-productos/JuegosDeMesa.webp";

const Index: React.FC = () => {
    return (
        <div className="profileindex">

            {/* Carousel */}
            <div id="demo" className="carousel slide" data-bs-ride="carousel">

                {/* Indicators */}
                <div className="carousel-indicators">
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            type="button"
                            data-bs-target="#demo"
                            data-bs-slide-to={n}
                            className={n === 0 ? "active" : ""}
                        ></button>
                    ))}
                </div>

                {/* Slides */}
                <div className="carousel-inner">

                    {/* Item 1 */}
                    <div className="carousel-item active">
                        <img src={Slide9} className="d-block w-100" />
                        <div className="carousel-caption">
                            <h1>Level-Up | Tienda Gamer</h1>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="carousel-item">
                        <img src={Slide1} className="d-block w-100" />
                        <div className="carousel-caption">
                            <h3>Conoce mas acerca de nuestra gran variedad de productos.</h3>
                            <a href="/productos" className="btn btn-gamer btn-lg mt-3">
                                Ver Productos
                            </a>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="carousel-item">
                        <img src={Slide10} className="d-block w-100" />
                        <div className="carousel-caption">
                            <h3>Conoce mas sobre nosotros y nuestra vision.</h3>
                            <a href="/sobre-nosotros" className="btn btn-gamer btn-lg mt-3">
                                Conocenos
                            </a>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="carousel-item">
                        <img src={Slide7} className="d-block w-100" />
                        <div className="carousel-caption">
                            <h3>Visita nuestros blogs y noticias gamer.</h3>
                            <a href="/blogs" className="btn btn-gamer btn-lg mt-3">
                                Blogs
                            </a>
                        </div>
                    </div>

                    {/* Item 5 */}
                    <div className="carousel-item">
                        <img src={Slide8} className="d-block w-100" />
                        <div className="carousel-caption">
                            <h3>Síguenos en Instagram.</h3>
                            <a
                                href="https://www.instagram.com/999leveluptienda"
                                className="btn btn-gamer btn-lg mt-3"
                            >
                                Redes
                            </a>
                        </div>
                    </div>

                    {/* Item 6 */}
                    <div className="carousel-item">
                        <img src={Slide5} className="d-block w-100" />
                        <div className="carousel-caption">
                            <h3>Únete a nuestra comunidad y obtén beneficios.</h3>
                            <a href="/registro" className="btn btn-gamer btn-lg mt-3">
                                Regístrate
                            </a>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#demo"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon"></span>
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#demo"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon"></span>
                </button>
            </div>

            {/* Benefits */}
            <section className="row mb-5" id="benefits">
                <div className="col-md-4 mb-4">
                    <div className="register-benefit">
                        <i className="bi bi-mortarboard-fill"></i>
                        <h4>Descuento Duoc</h4>
                        <p>20% de descuento para estudiantes Duoc UC</p>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="register-benefit">
                        <i className="bi bi-box-seam-fill"></i>
                        <h4>Envíos a todo Chile</h4>
                        <p>Despachamos sin costo adicional</p>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="register-benefit">
                        <i className="bi bi-award-fill"></i>
                        <h4>Programa Level-Up</h4>
                        <p>Gana puntos y canjéalos por productos</p>
                    </div>
                </div>
            </section>

            {/* Categorías */}
            <section id="categorias-productos" className="mb-5">
                <h1 className="section-title text-center mb-4">Categorías de Productos</h1>

                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

                        {/* Aquí podríamos mapear categorías desde un arreglo luego */}
                        {/* Te dejo un ejemplo convertido ya listo */}

                        <div className="col-md-6 col-lg-4">
                            <div className="category-card">
                                <img src={JuegosMesa} className="category-image" />
                                <div className="category-overlay">
                                    <h3 className="category-title">Juegos de Mesa</h3>
                                    <p>Descubre juegos sin pantallas.</p>
                                    <a href="/productos" className="view-all-btn">
                                        Ver todos
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Puedes seguir copiando el resto igual que este */}

                    </div>
                </div>
            </section>

        </div>
    );
};

export default Index;
