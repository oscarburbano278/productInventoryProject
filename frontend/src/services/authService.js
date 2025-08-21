// frontend/src/services/authService.js
const API_URL = "http://localhost:3000/api/auth";

export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return { error: "Error de conexión al servidor" };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return { error: "Error de conexión al servidor" };
  }
};

export const logoutUser = () => {
  // En este caso, el logout no necesita una llamada al backend.
  // La lógica principal de cerrar sesión es eliminar el token del frontend.
};