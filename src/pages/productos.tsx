import React, { useEffect, useState } from "react";
import "../assets/css/stylesheet-productos.css";

import catan from "../assets/img/productos/catan.webp";
import carcassonee from "../assets/img/productos/carcassonne.jpg";
import xbox from "../assets/img/productos/controlXbox360_2.jpg";
import audiHyper from "../assets/img/productos/auricularesHyperxCloud_2.jpeg";
import playstation5 from "../assets/img/productos/ps5.jpg";
import pcGamer from "../assets/img/productos/pcgamer.webp";
import sillaGamer from "../assets/img/productos/sillagamer.jpg";
import mouseLogitech from "../assets/img/productos/mouse.webp";
import mousepadRazer from "../assets/img/productos/mousepad.webp";
import polera from "../assets/img/productos/Polera.jpg";

interface Product {
  code: string;
  category: string;
  name: string;
  price: number;
  img: string;
  desc: string;
  details: string[];
}

interface CartItem extends Product {
  qty: number;
}

const categories = [
  { id: "ALL", name: "Todos" },
  { id: "JM", name: "Juegos de Mesa" },
  { id: "AC", name: "Accesorios" },
  { id: "CO", name: "Consolas" },
  { id: "CG", name: "Computadores Gamers" },
  { id: "SG", name: "Sillas Gamers" },
  { id: "MS", name: "Mouse" },
  { id: "MP", name: "Mousepad" },
  { id: "PP", name: "Poleras Personalizadas" },
];

const products: Product[] = [
  { code: "JM001", category: "JM", name: "Catan", price: 29990, img: catan, desc: "Un clásico juego de estrategia...", details: ["Jugadores: 3-4", "Edad: 10+"] },
  { code: "JM002", category: "JM", name: "Carcassone", price: 24990, img: carcassonee, desc: "Juego de mesa de estrategia...", details: ["Jugadores: 2-5", "Edad: 7+"] },
  { code: "AC002", category: "AC", name: "Control Xbox series", price: 59900, img: xbox, desc: "Control inalámbrico Xbox Series X|S", details: ["Conectividad: Inalámbrica y por cable", "Compatibilidad: Xbox Series X|S, Xbox One, Windows 10/11"] },
  { code: "AC001", category: "AC", name: "Audífonos HyperX Cloud II", price: 79900, img: audiHyper, desc: "Audífonos para gaming con sonido envolvente 7.1", details: ["Conectividad: Cableada USB y jack 3.5mm", "Compatibilidad: PC, Mac, PS4, Xbox One, Nintendo Switch"] },
  { code: "CO002", category: "CO", name: "PlayStation 5", price: 599900, img: playstation5, desc: "Consola de videojuegos PlayStation 5", details: ["Almacenamiento: SSD de 825GB", "Resolución: Hasta 8K", "Compatibilidad: Juegos PS5 y PS4"] },
  { code: "CG001", category: "CG", name: "PC Gamer ROG Strix", price: 1299900, img: pcGamer, desc: "Computadora gamer de alto rendimiento ROG Strix", details: ["Procesador: Intel i7-12700K", "Tarjeta Gráfica: NVIDIA RTX 3070", "RAM: 16GB DDR4", "Almacenamiento: SSD 1TB"] },
  { code: "SG001", category: "SG", name: "Silla Gamer Secretlab Titan", price: 399900, img: sillaGamer, desc: "Silla gamer de alta calidad Secretlab Titan", details: ["Material: Cuero PU premium", "Ajustes: Reclinable, altura, reposabrazos 4D", "Capacidad de peso: Hasta 130kg"] },
  { code: "MS001", category: "MS", name: "Mouse Gamer Logitech G502", price: 29990, img: mouseLogitech, desc: "Mouse gamer de alto rendimiento", details: ["Dimensiones: 355mm x 255mm", "Superficie: Textil optimizada", "Base: Goma antideslizante"] },
  { code: "MP001", category: "MP", name: "Hero Mousepad Razer Goliathus", price: 49900, img: mousepadRazer, desc: "Mousepad para gaming Razer Goliathus", details: ["DPI: Hasta 16,000", "Botones programables: 11", "Conectividad: Cableada USB"] },
  { code: "PP001", category: "PP", name: "Polera Gamer Personalizada", price: 19990, img: polera, desc: "Polera personalizada con diseño gamer", details: ["Material: Algodón 100%", "Tallas: S, M, L, XL, XXL", "Opciones de diseño: Varios diseños disponibles"] },
];

const Productos: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  // const token: string | undefined = JSON.parse(localStorage.getItem("user") || "{}")?.token;
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = user.token;

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.title = "Productos - Level Up Gamer";
  }, []);

  const addToCart = (product: Product) => {
    if (!token) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      window.location.href = "/inicio-sesion";
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.code === product.code);
      if (existing) return prev.map(item => item.code === product.code ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (code: string) => setCart(prev => prev.filter(item => item.code !== code));
  const clearCart = () => setCart([]);

  const checkout = async () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío ❌");
      return;
    }

    if (!token) {
      alert("Debes iniciar sesión para comprar");
      window.location.href = "/inicioSesion";
      return;
    }

    try {
      const resp = await fetch("http://localhost:3001/api/comprar", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ items: cart.map(({ code, qty }) => ({ code, qty })) }),
      });
      const data = await resp.json();
      if (resp.ok) {
        alert("✅ Compra realizada con éxito");
        clearCart();
      } else {
        alert(data.message || "Error al procesar la compra");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    }
  };

  const filteredProducts = filter === "ALL" ? products : products.filter(p => p.category === filter);

  return (
    <div className="profileproductos">
      <section className="hero-section">
        <div className="container">
          <h1 className="display-3 fw-bold">Catálogo de Productos</h1>
          <p className="display-6">Encuentra los mejores productos para gamers al mejor precio</p>
        </div>
      </section>

      <div className="bg-gamer py-3">
        <div className="container d-flex flex-wrap gap-2 justify-content-center">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`btn-category ${filter === cat.id ? "active" : ""}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <main className="container my-4">
        <div className="row">
          {filteredProducts.map((p: Product) => (
            <div className="col-md-4 mb-4" key={p.code}>
              <div className="card h-100">
                <img src={p.img} className="card-img-top" alt={p.name} />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title">{p.name}</h2>
                  <p className="card-text">{p.desc}</p>
                  <p className="fw-bold">${p.price.toLocaleString()}</p>
                  <button className="btn-add mt-auto" onClick={() => addToCart(p)}>
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Offcanvas Carrito */}
      <div className="offcanvas offcanvas-end text-white" tabIndex={-1} id="cartCanvas">
        <div className="offcanvas-header">
          <h2 className="offcanvas-title">🛒 Carrito de Compras</h2>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="list-group mb-3">
            {cart.length > 0 ? (
              cart.map((item: CartItem) => (
                <li key={item.code} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6>{item.name}</h6>
                    <small>${item.price.toLocaleString()} x {item.qty}</small>
                  </div>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.code)}>❌</button>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted">Carrito vacío</li>
            )}
          </ul>

          <h4>Total: ${cart.reduce((s, i) => s + i.price * i.qty, 0).toLocaleString()}</h4>
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-danger" onClick={clearCart}>Vaciar</button>
            <button className="btn btn-success" onClick={checkout}>Pagar</button>
          </div>
        </div>
      </div>

      {/* Botón flotante para abrir carrito */}
      {cart.length > 0 && (
        <button
          className="btn btn-success position-fixed"
          style={{ bottom: "20px", right: "20px", zIndex: 9999 }}
          data-bs-toggle="offcanvas"
          data-bs-target="#cartCanvas"
        >
          🛒 Ver Carrito ({cart.length})
        </button>
      )}
    </div>
  );
};

export default Productos;
