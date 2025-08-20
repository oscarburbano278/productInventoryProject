import React from 'react';

// Agregamos `onEditClick` como una prop
const ProductTable = ({ products, onEditClick,onDeleteClick }) => {
  return (
    <table className="product-table">
      {/* ... (encabezado de la tabla) ... */}
      <tbody>
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
                <button 
                  className="edit-btn" 
                  onClick={() => onEditClick(product)} // Llama a la función con el producto
                >
                  Editar
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => onDeleteClick(product.id)} // Llama a la función con el ID
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;