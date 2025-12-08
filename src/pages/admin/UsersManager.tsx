import React from "react";
import { useAdminUsers } from "../../Hooks/useAdminUsers";

const UsersManager: React.FC = () => {
    const { users, loading, error, deleteUser } = useAdminUsers();

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
                                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                                    <i className="fa fa-trash"></i> Eliminar
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
