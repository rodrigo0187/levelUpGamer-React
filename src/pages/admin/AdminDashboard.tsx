import React from "react";
import "./admin.css";

const AdminDashboard: React.FC = () => {
    return (
        <div>
            <h1>Dashboard administrativo</h1>
            <p>Bienvenido al panel de control de Level Up Gamer.</p>

            <div className="dashboard-cards">
                <div className="card">
                    <h3>Usuarios</h3>
                    <p>Gestionar usuarios registrados</p>
                    <a href="/admin/usuarios" className="btn-admin">Ver Usuarios</a>
                </div>
                <div className="card">
                    <h3>Productos</h3>
                    <p>Gestionar catálogo de productos</p>
                    <a href="/admin/productos" className="btn-admin">Ver Productos</a>
                </div>
                <div className="card">
                    <h3>Blog</h3>
                    <p>Gestionar publicaciones del blog</p>
                    <a href="/admin/blog" className="btn-admin">Ver Blog</a>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
