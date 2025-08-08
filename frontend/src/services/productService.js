// frontend/src/services/productService.js

// Define la URL base de tu API. Asegúrate de que coincida con la dirección donde corre tu backend.
const API_BASE_URL = 'http://localhost:3000/api'; 
const API_PRODUCTS_URL = `${API_BASE_URL}/products`;

// Función para obtener todos los productos
export const getProducts = async () => {
  try {
    const response = await fetch(API_PRODUCTS_URL);
    if (!response.ok) {
      // Manejo de errores si la respuesta no es exitosa (e.g., 404, 500)
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parsea la respuesta JSON
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Función para crear un nuevo producto
export const createProduct = async (productData) => {
  try {
    const response = await fetch(API_PRODUCTS_URL, {
      method: 'POST', // Método HTTP para crear recursos
      headers: {
        'Content-Type': 'application/json', // Le dice al servidor que estamos enviando JSON
      },
      body: JSON.stringify(productData), // Convierte el objeto de datos a una cadena JSON
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Función para actualizar un producto (ejemplo)
export const updateProduct = async (productId, productData) => {
  try {
    const response = await fetch(`${API_PRODUCTS_URL}/${productId}`, {
      method: 'PUT', // o 'PATCH' dependiendo de tu API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Función para eliminar un producto (ejemplo)
export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_PRODUCTS_URL}/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // No esperamos un cuerpo de respuesta JSON para una eliminación exitosa,
    // pero podemos devolver un mensaje o el estatus.
    return { status: response.status, message: 'Producto eliminado' };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};