import React, { useEffect, useState } from "react";
import { useAdminProducts } from "../../Hooks/useAdminProducts";

const ProductsManager: React.FC = () => {
    const { products, loading, error, deleteProduct, createProduct, updateProduct, fetchProducts } = useAdminProducts();
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [formData, setFormData] = useState({ nombre: "", precio: 0, stock: 0, imagen: "", descripcion: "" });
    const [showForm, setShowForm] = useState(false);

    // Sorting State
    const [sortBy, setSortBy] = useState<'id' | 'created_at'>('id');
    const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');

    useEffect(() => {
        fetchProducts(sortBy, order);
    }, [fetchProducts, sortBy, order]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            await updateProduct(editingProduct.id, formData);
            setEditingProduct(null);
        } else {
            await createProduct(formData);
        }
        setFormData({ nombre: "", precio: 0, stock: 0, imagen: "", descripcion: "" });
        setShowForm(false);
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
        setShowForm(true);
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setFormData({ nombre: "", precio: 0, stock: 0, imagen: "", descripcion: "" });
        setShowForm(false);
    };

    if (loading && products.length === 0) return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando...</span></div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger mt-4 shadow-sm" role="alert">
            <h4 className="alert-heading"><i className="fa fa-exclamation-triangle"></i> Error de Conexión</h4>
            <p>{error}</p>
            <hr />
            <p className="mb-0">Asegúrate de que el backend esté ejecutándose correctamente.</p>
        </div>
    );

    return (
        <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-primary"><i className="fa fa-box-open me-2"></i>Gestión de Productos</h2>
                <button className="btn btn-success shadow-sm" onClick={() => { setShowForm(!showForm); setEditingProduct(null); }}>
                    <i className={`fa ${showForm ? 'fa-minus' : 'fa-plus'} me-2`}></i>
                    {showForm ? "Cerrar Formulario" : "Nuevo Producto"}
                </button>
            </div>

            {/* Formulario */}
            {showForm && (
                <div className="card shadow-sm mb-4 border-0 bg-light animate__animated animate__fadeIn">
                    <div className="card-header bg-white border-0">
                        <h5 className="mb-0 text-secondary">{editingProduct ? "✏️ Editar Producto" : "✨ Nuevo Producto"}</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Nombre del Producto</label>
                                    <input className="form-control" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Precio</label>
                                    <div className="input-group">
                                        <span className="input-group-text">$</span>
                                        <input type="number" className="form-control" value={formData.precio} onChange={e => setFormData({ ...formData, precio: Number(e.target.value) })} required />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Stock</label>
                                    <input type="number" className="form-control" value={formData.stock} onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })} required />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">URL Imagen</label>
                                    <input className="form-control" value={formData.imagen} onChange={e => setFormData({ ...formData, imagen: e.target.value })} />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">Descripción</label>
                                    <textarea className="form-control" rows={3} value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} />
                                </div>
                            </div>
                            <div className="mt-4 text-end">
                                <button className="btn btn-secondary me-2" type="button" onClick={handleCancel}>Cancelar</button>
                                <button className="btn btn-primary px-4" type="submit">{editingProduct ? "Actualizar" : "Crear Producto"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Controles de Filtro */}
            <div className="card shadow-sm border-0 mb-3">
                <div className="card-body d-flex gap-3 align-items-center">
                    <span className="fw-bold text-secondary"><i className="fa fa-filter me-1"></i> Ordenar por:</span>
                    <select className="form-select w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value as 'id' | 'created_at')}>
                        <option value="id">ID</option>
                        <option value="created_at">Fecha de Creación</option>
                    </select>
                    <select className="form-select w-auto" value={order} onChange={(e) => setOrder(e.target.value as 'ASC' | 'DESC')}>
                        <option value="ASC">Ascendente (A-Z / Viejo-Nuevo)</option>
                        <option value="DESC">Descendente (Z-A / Nuevo-Viejo)</option>
                    </select>
                </div>
            </div>

            {/* Tabla de Productos */}
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light text-secondary">
                                <tr>
                                    <th className="ps-4">ID</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th className="text-end pe-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td className="ps-4 text-muted">#{p.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                {p.imagen ? (
                                                    <img src={p.imagen} alt={p.nombre} className="rounded me-3" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                                ) : (
                                                    <div className="rounded me-3 bg-secondary d-flex align-items-center justify-content-center text-white" style={{ width: "40px", height: "40px" }}><i className="fa fa-image"></i></div>
                                                )}
                                                <div>
                                                    <div className="fw-bold">{p.nombre}</div>
                                                    <small className="text-muted">{p.descripcion?.substring(0, 50)}...</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="fw-bold text-success">${p.precio.toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${p.stock > 5 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                {p.stock} en stock
                                            </span>
                                        </td>
                                        <td className="text-end pe-4">
                                            <button className="btn btn-outline-primary btn-sm me-2" onClick={() => startEdit(p)} title="Editar">
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => deleteProduct(p.id)} title="Eliminar">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-5 text-muted">
                                            <i className="fa fa-box-open fs-1 mb-3 d-block"></i>
                                            No hay productos disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsManager;
