import React, { useState, useEffect } from 'react';
//import './ProductFormModal.css';

// Agregamos `productToEdit` a las props
const ProductFormModal = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  // Usamos useEffect para precargar los datos si estamos editando
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
    } else {
      // Limpiamos los campos si estamos creando uno nuevo
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
    }
  }, [productToEdit]); // Se ejecuta cada vez que productToEdit cambia

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      // Si hay un producto para editar, enviamos su ID también
      id: productToEdit ? productToEdit.id : null,
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>{productToEdit ? 'Editar Producto' : 'Crear Nuevo Producto'}</h2>
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
          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;