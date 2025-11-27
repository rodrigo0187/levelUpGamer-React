import { useState, useCallback } from "react";

const API_URL = "http://localhost:3000/api";

export const useUsers = (token?: string | null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper para peticiones HTTP
  const request = useCallback(
    async (
      endpoint: string,
      options: RequestInit = {}
    ): Promise<any | null> => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}${endpoint}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Error en la petición");
        }

        return data;
      } catch (err: any) {
        setError(err.message);
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // ======================
  // ADMIN
  // ======================

  const getAllUsers = () => request("/users");

  const getUserById = (id: number) => request(`/users/${id}`);

  const updateUser = (id: number, body: Record<string, any>) =>
    request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

  const deleteUser = (id: number) =>
    request(`/users/${id}`, {
      method: "DELETE",
    });

  // ======================
  // USUARIO NORMAL
  // ======================

  const getMyProfile = () => request("/users/me");

  const updateMyProfile = (body: Record<string, any>) =>
    request(`/users/me`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

  return {
    loading,
    error,

    // Funciones expuestas del hook
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
  };
};
