import React, { useState, useMemo } from "react";
import { useAdminUsers } from "../../Hooks/useAdminUsers";
import type { AdminUser } from "../../interfaces/AdminUsers";
import "./UsersManager.css";

const UsersManager: React.FC = () => {
    const { users, loading, error, toggleUserStatus } = useAdminUsers();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
    const [filterRole, setFilterRole] = useState<"all" | "admin" | "user">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<"id" | "nombre" | "email" | "created_at">("id");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const itemsPerPage = 10;

    // Filter and search users
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch =
                user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.id.toString().includes(searchTerm);

            const matchesStatus =
                filterStatus === "all" ||
                (filterStatus === "active" && user.activo) ||
                (filterStatus === "inactive" && !user.activo);

            const matchesRole =
                filterRole === "all" ||
                user.role === filterRole;

            return matchesSearch && matchesStatus && matchesRole;
        });
    }, [users, searchTerm, filterStatus, filterRole]);

    // Sort users
    const sortedUsers = useMemo(() => {
        const sorted = [...filteredUsers].sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === "created_at") {
                aValue = new Date(aValue || 0).getTime();
                bValue = new Date(bValue || 0).getTime();
            }

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortOrder === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return sortOrder === "asc"
                ? (aValue as number) - (bValue as number)
                : (bValue as number) - (aValue as number);
        });
        return sorted;
    }, [filteredUsers, sortBy, sortOrder]);

    // Pagination
    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedUsers.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedUsers, currentPage]);

    const handleSort = (field: typeof sortBy) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setSortOrder("asc");
        }
    };

    const handleToggleStatus = async (user: AdminUser) => {
        await toggleUserStatus(user.id, user.activo);
    };

    const getStatusBadge = (activo: boolean) => {
        return activo ? (
            <span className="status-badge status-active">
                <i className="fa fa-check-circle"></i> Activo
            </span>
        ) : (
            <span className="status-badge status-inactive">
                <i className="fa fa-ban"></i> Inactivo
            </span>
        );
    };

    const getRoleBadge = (role: string) => {
        return role === "admin" ? (
            <span className="role-badge role-admin">
                <i className="fa fa-shield"></i> Admin
            </span>
        ) : (
            <span className="role-badge role-user">
                <i className="fa fa-user"></i> Usuario
            </span>
        );
    };

    if (loading) {
        return (
            <div className="users-manager">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando usuarios...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="users-manager">
                <div className="error-container">
                    <i className="fa fa-exclamation-triangle"></i>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="users-manager">
            <div className="users-header">
                <div className="header-title">
                    <h1>
                        <i className="fa fa-users"></i> Gestión de Usuarios
                    </h1>
                    <p className="subtitle">
                        Administra los usuarios de la plataforma
                    </p>
                </div>
                <div className="header-stats">
                    <div className="stat-card">
                        <div className="stat-icon total">
                            <i className="fa fa-users"></i>
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Total</span>
                            <span className="stat-value">{users.length}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon active">
                            <i className="fa fa-check-circle"></i>
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Activos</span>
                            <span className="stat-value">
                                {users.filter(u => u.activo).length}
                            </span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon inactive">
                            <i className="fa fa-ban"></i>
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Inactivos</span>
                            <span className="stat-value">
                                {users.filter(u => !u.activo).length}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="users-controls">
                <div className="search-box">
                    <i className="fa fa-search"></i>
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o ID..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="filters">
                    <select
                        value={filterStatus}
                        onChange={(e) => {
                            setFilterStatus(e.target.value as any);
                            setCurrentPage(1);
                        }}
                        className="filter-select"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="active">Activos</option>
                        <option value="inactive">Inactivos</option>
                    </select>
                    <select
                        value={filterRole}
                        onChange={(e) => {
                            setFilterRole(e.target.value as any);
                            setCurrentPage(1);
                        }}
                        className="filter-select"
                    >
                        <option value="all">Todos los roles</option>
                        <option value="admin">Administradores</option>
                        <option value="user">Usuarios</option>
                    </select>
                </div>
            </div>

            <div className="users-table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("id")} className="sortable">
                                ID {sortBy === "id" && (
                                    <i className={`fa fa-sort-${sortOrder === "asc" ? "up" : "down"}`}></i>
                                )}
                            </th>
                            <th onClick={() => handleSort("nombre")} className="sortable">
                                Usuario {sortBy === "nombre" && (
                                    <i className={`fa fa-sort-${sortOrder === "asc" ? "up" : "down"}`}></i>
                                )}
                            </th>
                            <th onClick={() => handleSort("email")} className="sortable">
                                Email {sortBy === "email" && (
                                    <i className={`fa fa-sort-${sortOrder === "asc" ? "up" : "down"}`}></i>
                                )}
                            </th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th onClick={() => handleSort("created_at")} className="sortable">
                                Fecha de Registro {sortBy === "created_at" && (
                                    <i className={`fa fa-sort-${sortOrder === "asc" ? "up" : "down"}`}></i>
                                )}
                            </th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="no-results">
                                    <i className="fa fa-search"></i>
                                    <p>No se encontraron usuarios</p>
                                </td>
                            </tr>
                        ) : (
                            paginatedUsers.map(user => (
                                <tr key={user.id} className={!user.activo ? "inactive-row" : ""}>
                                    <td className="user-info" data-label="Usuario">
                                        <div className="user-avatar">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.nombre} />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    {user.nombre.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <span className="user-name">{user.nombre}</span>
                                    </td>
                                    <td className="user-id" data-label="ID">#{user.id}</td>
                                    <td className="user-email" data-label="Email">{user.email}</td>
                                    <td data-label="Rol">{getRoleBadge(user.role)}</td>
                                    <td data-label="Estado">{getStatusBadge(user.activo)}</td>
                                    <td className="user-date" data-label="Fecha de Registro">
                                        {user.created_at
                                            ? new Date(user.created_at).toLocaleDateString('es-ES')
                                            : "N/A"
                                        }
                                    </td>
                                    <td className="user-actions" data-label="Acciones">
                                        <button
                                            className={`action-btn ${user.activo ? 'btn-deactivate' : 'btn-activate'}`}
                                            onClick={() => handleToggleStatus(user)}
                                            title={user.activo ? "Desactivar usuario" : "Activar usuario"}
                                        >
                                            <i className={`fa ${user.activo ? 'fa-ban' : 'fa-check'}`}></i>
                                            {user.activo ? "Desactivar" : "Activar"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    >
                        <i className="fa fa-angle-double-left"></i>
                    </button>
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <i className="fa fa-angle-left"></i>
                    </button>
                    <span className="pagination-info">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <i className="fa fa-angle-right"></i>
                    </button>
                    <button
                        className="pagination-btn"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <i className="fa fa-angle-double-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UsersManager;
