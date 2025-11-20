// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas
import Index from "./pages/index";
import Productos from "./pages/Productos";
import Soporte from "./pages/Soporte";
import Blog from "./pages/Blog";
import SobreNosotros from "./pages/SobreNosotros";
import Registro from "./pages/Registro";
import InicioSesion from "./pages/InicioSesion";
import NotFound from "./components/NotFound";

// CSS GLOBAL REAL
import "./assets/css/stylesheet-html-body.css";
import "./assets/css/stylesheet-general.css";
import "./assets/css/stylesheet-navbar.css";
import "./assets/css/stylesheet-footer.css";

// LIBRERÍAS (solo aquí debe cargarse)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "./assets/fonts/fonts.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/soporte" element={<Soporte />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/SobreNosotros" element={<SobreNosotros />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/InicioSesion" element={<InicioSesion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
