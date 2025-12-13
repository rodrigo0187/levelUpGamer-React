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

            if (!res.ok) throw new Error("Error fetching users");

            const data = await res.json();

            setUsers(
                data.map((u: AdminUser) => ({
                    ...u,
                    activo: Boolean(u.activo)
                }))
            );
        } catch (err: any) {
            setError(err.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Put
    const toggleUserStatus = async (id: number, currentStatus: boolean) => {
        if (!confirm(`¿${currentStatus ? "Bloquear" : "Activar"} usuario?`)) return;

        try {
            const res = await fetch(`${API_URL}/admin/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ activo: !currentStatus })
            });

            if (!res.ok) throw new Error("Error updating user status");

            setUsers(users =>
                users.map(u =>
                    u.id === id ? { ...u, activo: !currentStatus } : u
                )
            );
        } catch (err: any) {
            alert(err.message);
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
