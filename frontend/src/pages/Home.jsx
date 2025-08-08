// frontend/src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { createProduct } from '../services/productService';
import ProductTable from '../components/ProductTable';
import ProductFormModal from '../components/ProductFormModal';
import '../styles/styles.css';


function HomePage() {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(true);
  // Estado para manejar cualquier error que pueda ocurrir
  const [error, setError] = useState(null);

   // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Función asíncrona para obtener los productos del backend
    const fetchProducts = async () => {
      try {
        // Llama a la función del servicio
        const productsData = await getProducts();
        // Actualiza el estado con los productos obtenidos
        setProducts(productsData);
      } catch (err) {
        // Si hay un error, actualiza el estado de error
        setError("Error al cargar los productos.");
        console.error(err);
      } finally {
        // En cualquier caso (éxito o error), la carga ha terminado
        setLoading(false);
      }
    };
    
    fetchProducts();
    // El array vacío `[]` como segundo argumento asegura que este efecto
    // se ejecute solo una vez, cuando el componente se monta por primera vez.
  }, []);

   // Función para guardar un nuevo producto
  const handleSaveProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData);
      // Actualizamos la lista de productos sin tener que volver a pedir todos los datos
      setProducts([...products, newProduct]);
    } catch (err) {
      console.error("Error al crear el producto:", err);
      // Aquí puedes manejar el error de forma más elegante
    }
  };

  if (loading) {
    // Muestra un mensaje de carga mientras se obtienen los datos
    return <div>Cargando productos...</div>
  }

  if (error) {
    // Muestra un mensaje de error si la petición falla
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      {/* Botón para abrir el modal */}
      <button onClick={() => setIsModalOpen(true)}>Crear Producto</button>
      <ProductTable products={products} />

      {/* El modal se renderiza condicionalmente */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}

export default HomePage;