import { useState, useEffect, useCallback } from "react";
import { API_URL } from "./api";

export function useAdminBlog() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = JSON.parse(localStorage.getItem("user") || "{}").token;

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/posts`);
            if (!res.ok) throw new Error("Error fetching posts");
            const data = await res.json();
            setPosts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const deletePost = async (id: number) => {
        if (!confirm("¿Eliminar post?")) return;
        try {
            const res = await fetch(`${API_URL}/posts/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Error deleting post");
            setPosts(posts.filter(p => p.id !== id));
        } catch (err: any) {
            alert(err.message);
        }
    };

    const createPost = async (postData: any) => {
        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });
            if (!res.ok) throw new Error("Error creating post");
            fetchPosts(); // Reload list
        } catch (err: any) {
            alert(err.message);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return { posts, loading, error, deletePost, createPost };
}
