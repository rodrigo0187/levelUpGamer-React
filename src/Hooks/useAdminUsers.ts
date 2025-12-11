import { useState, useEffect, useCallback } from "react";
import { API_URL } from "./api"; // Ensure this exists or use full path

interface User {
    id: number;
    nombre: string;
    email: string;
    role: string;
    telefono?: string;
    activo: boolean;
}

export function useAdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = JSON.parse(localStorage.getItem("user") || "{}").token;

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Error fetching users");
            const data = await res.json();
            // Ensure data has active field (default to true if missing from API initially)
            setUsers(data.map((u: any) => ({ ...u, activo: u.activo !== 0 })));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const toggleUserStatus = async (id: number, currentStatus: boolean) => {
        if (!confirm(`¿${currentStatus ? 'Bloquear' : 'Activar'} usuario?`)) return;
        try {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ activo: !currentStatus })
            });
            if (!res.ok) throw new Error("Error updating user status");
            setUsers(users.map(u => u.id === id ? { ...u, activo: !currentStatus } : u));
        } catch (err: any) {
            alert(err.message);
        }
    };

    const deleteUser = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
        try {
            const res = await fetch(`${API_URL}/users/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Error deleting user");
            setUsers(users.filter(u => u.id !== id));
        } catch (err: any) {
            alert(err.message);
        }
    };

    // Placeholder for update (could be implemented if needed)

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return { users, loading, error, deleteUser, fetchUsers, toggleUserStatus };
}
