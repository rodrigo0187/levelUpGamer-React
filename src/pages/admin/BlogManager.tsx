import React, { useState } from "react";
import { useAdminBlog } from "../../Hooks/useAdminBlog";

const BlogManager: React.FC = () => {
    const { posts, loading, error, deletePost, createPost } = useAdminBlog();
    const [newPost, setNewPost] = useState({ titulo: "", contenido: "", imagen: "", url: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createPost(newPost);
        setNewPost({ titulo: "", contenido: "", imagen: "", url: "" });
    };

    if (loading) return <p>Cargando blog...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div>
            <h2>Gestión de Blog</h2>

            {/* Simple Create Form */}
            <div className="card mb-4 p-3">
                <h5>Crear Nueva Publicación</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <input className="form-control" placeholder="Título" value={newPost.titulo} onChange={e => setNewPost({ ...newPost, titulo: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                        <textarea className="form-control" placeholder="Contenido" value={newPost.contenido} onChange={e => setNewPost({ ...newPost, contenido: e.target.value })} required />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" placeholder="URL Imagen" value={newPost.imagen} onChange={e => setNewPost({ ...newPost, imagen: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input className="form-control" placeholder="URL WEB" value={newPost.url} onChange={e => setNewPost({ ...newPost, url: e.target.value })} />
                    </div>
                    <button className="btn btn-primary" type="submit">Publicar</button>
                </form>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.titulo}</td>
                            <td>{new Date(post.fecha).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => deletePost(post.id)}>
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

export default BlogManager;
