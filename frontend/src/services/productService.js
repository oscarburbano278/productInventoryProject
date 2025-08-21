// frontend/src/services/productService.js
const API_URL = "http://localhost:3000/api/products";

// Función para obtener todos los productos
export const getProducts = async () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("No hay token de autenticación. Por favor, inicie sesión.");
  }
  
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Función para crear un nuevo producto
export const createProduct = async (productData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token de autenticación.");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Función para actualizar un producto existente
export const updateProduct = async (productId, productData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token de autenticación.");
  }

  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Función para eliminar un producto
export const deleteProduct = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token de autenticación.");
  }

  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return { message: "Producto eliminado correctamente" };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};