// frontend/src/pages/Home.js

import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService'; 

function HomePage() {
  // Estado para almacenar la lista de productos
  const [products, setProducts] = useState([]);
  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(true);
  // Estado para manejar cualquier error que pueda ocurrir
  const [error, setError] = useState(null);

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
      {products.length === 0 ? (
        // Muestra este mensaje si no hay productos
        <p>No hay productos disponibles.</p>
      ) : (
        // Itera sobre el array de productos y muestra cada uno
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <p>Nombre: {product.name}</p>
              <p>Descripción: {product.description}</p>
              <p>Precio: ${product.price}</p>
              <p>Stock disponible: {product.stock}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;