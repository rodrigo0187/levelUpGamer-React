import React from "react";
import { useAdminUsers } from "../../Hooks/useAdminUsers";

const UsersManager: React.FC = () => {
    const { users, loading, error, deleteUser, toggleUserStatus } = useAdminUsers();

    if (loading) return <p>Cargando usuarios...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.nombre}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {user.activo ? (
                                    <span className="badge bg-success">Activo</span>
                                ) : (
                                    <span className="badge bg-danger">Bloqueado</span>
                                )}
                            </td>
                            <td>
                                <button
                                    className={`btn btn-sm me-2 ${user.activo ? 'btn-warning' : 'btn-success'}`}
                                    onClick={() => toggleUserStatus(user.id, user.activo)}
                                >
                                    {user.activo ? <i className="fa fa-ban"></i> : <i className="fa fa-check"></i>}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersManager;
