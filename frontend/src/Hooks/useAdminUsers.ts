import { useState, useEffect, useCallback } from "react";
import type { AdminUser } from "../interfaces/AdminUsers";
import { API_URL } from "./api";

export function useAdminUsers() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
    // Get
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/admin/users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // capturar el error 
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `Error ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();

            setUsers(
                data.map((u: AdminUser) => ({
                    ...u,
                    activo: Boolean(u.activo)
                }))
            );
        } catch (err: any) {
            console.error("Error fetching users:", err);
            setError(err.message || "Error desconocido al obtener usuarios");
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Put
    const toggleUserStatus = async (id: number, currentStatus: boolean) => {
        const action = currentStatus ? "desactivar" : "activar";
        if (!confirm(`¿Está seguro que desea ${action} este usuario?`)) return;

        try {
            const res = await fetch(`${API_URL}/admin/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ activo: !currentStatus })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || "Error al actualizar el estado del usuario");
            }

            // Update local state
            setUsers(users =>
                users.map(u =>
                    u.id === id ? { ...u, activo: !currentStatus } : u
                )
            );

            // Success notification
            alert(`Usuario ${currentStatus ? "desactivado" : "activado"} correctamente`);
        } catch (err: any) {
            console.error("Error toggling user status:", err);
            alert(err.message || "Error al actualizar el estado del usuario");
        }
    };
    // delete
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        error,
        fetchUsers,
        toggleUserStatus,
    };
}
