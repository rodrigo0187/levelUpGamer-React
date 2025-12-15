import React, { useState } from "react";
import { useAdminBlog } from "../../Hooks/useAdminBlog";

const BlogManager: React.FC = () => {
    const { posts, loading, error, deletePost, createPost, updatePost } = useAdminBlog();
    const [newPost, setNewPost] = useState({ titulo: "", contenido: "", imagen: "", url: "" });
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            await updatePost(editingId, newPost);
            setEditingId(null);
        } else {
            await createPost(newPost);
        }
        setNewPost({ titulo: "", contenido: "", imagen: "", url: "" });
    };

    const handleEdit = (post: any) => {
        setNewPost({
            titulo: post.titulo,
            contenido: post.contenido,
            imagen: post.imagen || "",
            url: post.url || ""
        });
        setEditingId(post.id);
    };

    const handleCancelEdit = () => {
        setNewPost({ titulo: "", contenido: "", imagen: "", url: "" });
        setEditingId(null);
    };

    if (loading) return <p>Cargando blog...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div>
            <h2>Gestión de Blog</h2>

            {/* Create/Edit Form */}
            <div className="card mb-4 p-3">
                <h5>{editingId ? "Editar Publicación" : "Crear Nueva Publicación"}</h5>
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
                    <div className="d-flex gap-2">
                        <button className={`btn ${editingId ? "btn-warning" : "btn-success"} px-4`} type="submit">
                            <i className={`fa ${editingId ? "fa-save" : "fa-plus-circle"} me-2`}></i>
                            {editingId ? "Actualizar" : "Publicar"}
                        </button>
                        {editingId && (
                            <button type="button" className="btn btn-secondary px-4" onClick={handleCancelEdit}>
                                <i className="fa fa-times me-2"></i> Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="table-responsive">
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
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-info btn-sm" onClick={() => handleEdit(post)} title="Editar">
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button className="btn btn-danger btn-sm" onClick={() => deletePost(post.id)} title="Eliminar">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BlogManager;
