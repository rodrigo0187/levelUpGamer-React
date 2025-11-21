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
// ================= DATOS =================
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

const products = [
  {
    code: "JM001",
    category: "JM",
    name: "Catan",
    price: 29990,
    img: catan,
    desc: "Un clásico juego de estrategia...",
    details: ["Jugadores: 3-4", "Edad: 10+"],
  },
  {
    code: "JM002",
    category: "JM",
    name: "Carcassone",
    price: 24990,
    img: carcassonee,
    desc: "juego de mesa de estrategia donde los jugadores colocan fichas de terreno para construir ciudades, caminos, monasterios y campos.",
    details: ["Jugadores: 2-5", "Edad: 7+"],
  },
  {
    code: "CO001",
    category: "CO",
    name: "Control Xbox series",
    price: 59900,
    img: xbox,
    desc: "Control inalámbrico Xbox Series X|S",
    details: ["Conectividad: Inalámbrica y por cable", "Compatibilidad: Xbox Series X|S, Xbox One, Windows 10/11"]
  },
  {
    code: "AC001",
    category: "AC",
    name: "Audífonos HyperX Cloud II",
    price: 79900,
    img: audiHyper,
    desc: "Audífonos para gaming con sonido envolvente 7.1",
    details: ["Conectividad: Cableada USB y jack 3.5mm", "Compatibilidad: PC, Mac, PS4, Xbox One, Nintendo Switch"]
  },
  {
    code: "CO002",
    category: "CO",
    name: "PlayStation 5",
    price: 599900,
    img: playstation5,
    desc: "Consola de videojuegos PlayStation 5",
    details: ["Almacenamiento: SSD de 825GB", "Resolución: Hasta 8K", "Compatibilidad: Juegos PS5 y PS4"]
  },
  {
    code: "CG001",
    category: "CG",
    name: "PC Gamer ROG Strix",
    price: 1299900,
    img: pcGamer,
    desc: "Computadora gamer de alto rendimiento ROG Strix",
    details: ["Procesador: Intel i7-12700K", "Tarjeta Gráfica: NVIDIA RTX 3070", "RAM: 16GB DDR4", "Almacenamiento: SSD 1TB"]
  },
  {
    code: "SG001",
    category: "SG",
    name: "Silla Gamer Secretlab Titan",
    price: 399900,
    img: sillaGamer,
    desc: "Silla gamer de alta calidad Secretlab Titan",
    details: ["Material: Cuero PU premium", "Ajustes: Reclinable, altura, reposabrazos 4D", "Capacidad de peso: Hasta 130kg"]
  },
  {
    code: "MS001",
    category: "MS",
    name: "Hero Mousepad Razer Goliathus",
    price: 49900,
    img: mousepadRazer,
    desc: "Mouse gamer con sensor HERO 16K",
    details: ["DPI: Hasta 16,000", "Botones programables: 11", "Conectividad: Cableada USB"]
  },
  {
    code: "MP001",
    category: "MP",
    name: "Mouse Gamer Logitech G502",
    price: 29990,
    img: mouseLogitech,
    desc: "Mousepad para gaming Razer Goliathus",
    details: ["Dimensiones: 355mm x 255mm", "Superficie: Textil optimizada para sensores ópticos y láser", "Base: Goma antideslizante"]
  },
  {
    code: "PP001",
    category: "PP",
    name: "Polera Gamer Personalizada",
    price: 19990,
    img: polera,
    desc: "Polera personalizada con diseño gamer",
    details: ["Material: Algodón 100%", "Tallas: S, M, L, XL, XXL", "Opciones de diseño: Varios diseños disponibles"]
  }
  // ... los demás productos
];

// ================= COMPONENTE =================
const Productos: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [filter, setFilter] = useState("ALL");

  // ======= LOCAL STORAGE =======
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

  // ======= ACCIONES CARRITO =======
  const addToCart = (code: string) => {
    const product = products.find(p => p.code === code);
    if (!product) return;

    setCart(prev => {
      const existing = prev.find(item => item.code === code);
      if (existing) {
        return prev.map(item =>
          item.code === code ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (code: string) => {
    setCart(prev => prev.filter(item => item.code !== code));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío ❌");
      return;
    }
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    alert(`✅ Gracias por tu compra! Total: $${total.toLocaleString()}`);
    clearCart();
  };

  // ======= FILTRADO =======
  const filteredProducts =
    filter === "ALL"
      ? products
      : products.filter(p => p.category === filter);

  return (
    <div className="profileproductos">
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
          <div className="d-flex flex-wrap gap-2 justify-content-center">
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
      </div>

      {/* PRODUCTOS */}
      <main className="container my-4">
        <div className="row">
          {filteredProducts.map(p => (
            <div className="col-md-4 mb-4" key={p.code}>
              <div className="card h-100">
                <img src={p.img} className="card-img-top" alt={p.name} />
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title">{p.name}</h2>
                  <p className="card-text">{p.desc}</p>
                  <p className="fw-bold">${p.price.toLocaleString()}</p>
                  <button
                    className="btn-add mt-auto"
                    onClick={() => addToCart(p.code)}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* OFFCANVAS CARRITO */}
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="cartCanvas">
        <div className="offcanvas-header">
          <h2 className="offcanvas-title">🛒 Carrito de Compras</h2>
          <button type="button" className="btn-close"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="list-group mb-3">
            {cart.map(item => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={item.code}
              >
                <div>
                  <h6>{item.name}</h6>
                  <small>
                    ${item.price.toLocaleString()} x {item.qty}
                  </small>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromCart(item.code)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <h4>
            Total: $
            {cart
              .reduce((s, i) => s + i.price * i.qty, 0)
              .toLocaleString()}
          </h4>

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-danger" onClick={clearCart}>
              Vaciar
            </button>
            <button className="btn btn-success" onClick={checkout}>
              Pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;
