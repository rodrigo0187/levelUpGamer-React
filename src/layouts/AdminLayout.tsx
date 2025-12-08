import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../assets/css/admin-layout.css"; // We will create this css later or use inline styles for now

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/inicio-sesion");
    };

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <ul>
                        <li><Link to="/admin">Dashboard</Link></li>
                        <li><Link to="/admin/usuarios">Usuarios</Link></li>
                        <li><Link to="/admin/productos">Productos</Link></li>
                        <li><Link to="/admin/blog">Blog</Link></li>
                    </ul>
                </nav>
                <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
