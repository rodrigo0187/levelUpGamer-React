import React from "react";
import { useAdminProducts } from "../../Hooks/useAdminProducts";

const ProductsManager: React.FC = () => {
    const { products, loading, error, deleteProduct, createProduct, updateProduct } = useAdminProducts();
    const [editingProduct, setEditingProduct] = React.useState<any | null>(null);
    const [formData, setFormData] = React.useState({ nombre: "", precio: 0, stock: 0, imagen: "", descripcion: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            await updateProduct(editingProduct.id, formData);
            setEditingProduct(null);
        } else {
            await createProduct(formData);
        }
        setFormData({ nombre: "", precio: 0, stock: 0, imagen: "", descripcion: "" });
    };

    const startEdit = (product: any) => {
        setEditingProduct(product);
        setFormData({
            nombre: product.nombre,
            precio: product.precio,
            stock: product.stock,
            imagen: product.imagen || "",
            descripcion: product.descripcion || ""
        });
    };

    if (loading) return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger mt-4" role="alert">
            <h4 className="alert-heading"><i className="fa fa-exclamation-triangle"></i> Error de Conexión</h4>
            <p>{error}</p>
            <hr />
            <p className="mb-0">Por favor, verifica que XAMPP (MySQL) y el servidor backend estén corriendo.</p>
        </div>
    );

    return (
        <div>
            <h2>Gestión de Productos</h2>

            <div className="card mb-4 p-3">
                <h5>{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <input className="form-control" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
                        </div>
                        <div className="col-md-3 mb-2">
                            <input type="number" className="form-control" placeholder="Precio" value={formData.precio} onChange={e => setFormData({ ...formData, precio: Number(e.target.value) })} required />
                        </div>
                        <div className="col-md-3 mb-2">
                            <input type="number" className="form-control" placeholder="Stock" value={formData.stock} onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })} required />
                        </div>
                        <div className="col-md-12 mb-2">
                            <input className="form-control" placeholder="URL Imagen" value={formData.imagen} onChange={e => setFormData({ ...formData, imagen: e.target.value })} />
                        </div>
                        <div className="col-md-12 mb-2">
                            <textarea className="form-control" placeholder="Descripción" value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">{editingProduct ? "Actualizar" : "Crear"}</button>
                    {editingProduct && <button className="btn btn-secondary ms-2" type="button" onClick={() => { setEditingProduct(null); setFormData({ nombre: "", precio: 0, stock: 0, imagen: "", descripcion: "" }); }}>Cancelar</button>}
                </form>
            </div>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>${p.precio}</td>
                            <td>{p.stock}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => startEdit(p)}>
                                    <i className="fa fa-pencil"></i>
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsManager;
