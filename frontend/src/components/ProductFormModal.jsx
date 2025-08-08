// frontend/src/components/ProductFormModal.js
import React, { useState } from 'react';


const ProductFormModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llama a la función onSave que viene de Home.js
    onSave({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    });
    // Limpia el formulario
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    onClose(); // Cierra el modal
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>Crear Nuevo Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Descripción:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>
          <button type="submit">Guardar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;