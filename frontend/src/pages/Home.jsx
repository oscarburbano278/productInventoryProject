import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/productService'; 
import ProductTable from '../components/ProductTable';
import ProductFormModal from '../components/ProductFormModal';
import "../styles/styles.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Nuevo estado para guardar el producto que se va a editar
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (err) {
      setError("Error al cargar los productos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (productData) => {
    try {
      // Si productData tiene un ID, es una edición
      if (productData.id) {
        const updatedProduct = await updateProduct(productData.id, productData);
        // Actualizamos la lista de productos
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      } else {
        // Si no, es una creación
        const newProduct = await createProduct(productData);
        setProducts([...products, newProduct]);
      }
    } catch (err) {
      console.error("Error al guardar el producto:", err);
    }
  };

  // Nueva función para eliminar un producto
  const handleDeleteProduct = async (productId) => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (isConfirmed) {
      try {
        await deleteProduct(productId);
        // Filtramos el producto eliminado de la lista de productos
        setProducts(products.filter(p => p.id !== productId));
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
        alert("Hubo un error al intentar eliminar el producto.");
      }
    }
  };



  // Nueva función para manejar el clic en "Editar"
  const handleEditClick = (product) => {
    setProductToEdit(product); // Guardamos el producto en el estado
    setIsModalOpen(true); // Abrimos el modal
  };

  // Función para cerrar el modal y limpiar el estado de edición
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null); // Importante para que el próximo modal sea de creación
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      <button onClick={() => { setIsModalOpen(true); setProductToEdit(null); }}>Crear Producto</button>
      <ProductTable products={products} onEditClick={handleEditClick} onDeleteClick={handleDeleteProduct}/>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </div>
  );
}

export default HomePage;