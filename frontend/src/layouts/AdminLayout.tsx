import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../assets/css/admin-layout.css";

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/inicio-sesion");
    };

    return (
        <div className="admin-container">
            <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    {!isCollapsed && <h2>Admin Panel</h2>}
                    <button
                        className="collapse-btn"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        title={isCollapsed ? "Expandir menú" : "Contraer menú"}
                    >
                        <i className={`fa fa-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
                    </button>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/admin" title="Dashboard">
                                <i className="fa fa-tachometer"></i>
                                {!isCollapsed && <span>Dashboard</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/usuarios" title="Usuarios">
                                <i className="fa fa-users"></i>
                                {!isCollapsed && <span>Usuarios</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/productos" title="Productos">
                                <i className="fa fa-box"></i>
                                {!isCollapsed && <span>Productos</span>}
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/blog" title="Blog">
                                <i className="fa fa-newspaper-o"></i>
                                {!isCollapsed && <span>Blog</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button onClick={handleLogout} className="logout-btn" title="Cerrar Sesión">
                    <i className="fa fa-sign-out"></i>
                    {!isCollapsed && <span>Cerrar Sesión</span>}
                </button>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
