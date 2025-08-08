// frontend/src/components/ProductTable.js
import React from 'react';

// El componente recibe la lista de productos como una prop
const ProductTable = ({ products }) => {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Verifica si hay productos antes de mapear */}
        {products.length === 0 ? (
          <tr>
            <td colSpan="6">No hay productos disponibles.</td>
          </tr>
        ) : (
          products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                {/* Agregaremos los botones de acción aquí */}
                <button className="edit-btn">Editar</button>
                <button className="delete-btn">Eliminar</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;