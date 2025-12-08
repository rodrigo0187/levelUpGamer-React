import React from "react";
import { useAdminProducts } from "../../Hooks/useAdminProducts";

const ProductsManager: React.FC = () => {
    const { products, loading, error, deleteProduct } = useAdminProducts();

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div>
            <h2>Gestión de Productos</h2>
            {/* TODO: Add 'Create Product' button */}
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
                                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>
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

export default ProductsManager;
