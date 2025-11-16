import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../assets/css/stylesheet-productos.css"
import "../assets/css/stylesheet-footer.css"
import "../assets/css/stylesheet-nav-bar-custom.css"

export default function Productos() {
  return (
    <div className="profileproductos">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="hero-section">
        <div className="container">
          <h1 className="display-3 fw-bold">Catálogo de Productos</h1>
          <p className="display-6">
            Encuentra los mejores productos para gamers al mejor precio
          </p>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <div className="bg-gamer py-3">
        <div className="container">
          <div
            className="d-flex flex-wrap gap-2 justify-content-center"
            id="category-list"
          >
            {/* categorías dinámicas irán aquí */}
          </div>
        </div>
      </div>

      {/* PRODUCTOS */}
      <main className="container my-4">
        <div className="row" id="product-list">
          {/* productos dinámicos irán aquí */}
        </div>
      </main>

      {/* OFFCANVAS CARRITO */}
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="cartCanvas">
        <div className="offcanvas-header">
          <h2 className="offcanvas-title">🛒 Carrito de Compras</h2>
          <button type="button" className="btn-close"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="list-group mb-3" id="cart-items">
            {/* items dinámicos */}
          </ul>

          <h4>
            Total: $<span id="cart-total">0</span>
          </h4>

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-danger" id="clear-cart">
              Vaciar
            </button>
            <button className="btn btn-success" id="checkout">
              Pagar
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
