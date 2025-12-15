// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas
import Index from "./pages/index";
import Productos from "./pages/productos";
import Soporte from "./pages/soporte";
import Blog from "./pages/blog";
import SobreNosotros from "./pages/sobre-Nosotros";
import Registro from "./pages/registro";
import InicioSesion from "./pages/inicio-sesion";
import NotFound from "./components/NotFound";
import Perfil from "./pages/perfil";
import VermiPerfil from "./pages/ver-Mi-perfil";
import TerminosYCondiciones from "./pages/terminos-y-condiciones";
import PoliticaYPrivacidad from "./pages/politica-y-privacidad";
// CSS GLOBAL REAL
import "./assets/css/stylesheet-html-body.css";
import "./assets/css/stylesheet-general.css";
import "./assets/css/stylesheet-nav-bar.css";
import "./assets/css/stylesheet-footer.css";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersManager from "./pages/admin/UsersManager";
import ProductsManager from "./pages/admin/ProductsManager";
import BlogManager from "./pages/admin/BlogManager";
import ProtectedRoute from "./components/ProtectedRoute";


// LIBRERÍAS
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
        <Route path="/sobre-Nosotros" element={<SobreNosotros />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/ver-mi-Perfil" element={<VermiPerfil />} />
        <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
        <Route path="/politica-y-privacidad" element={<PoliticaYPrivacidad />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="usuarios" element={<UsersManager />} />
            <Route path="productos" element={<ProductsManager />} />
            <Route path="blog" element={<BlogManager />} />
          </Route>
        </Route>


      </Routes>

      <Footer />
    </>
  );
}

export default App;
