// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { registerUser, loginUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = payload.exp * 1000;
        if (expirationTime > Date.now()) {
          setUser({ token: token, name: payload.name });
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) { // Usa la variable 'error'
        console.error("Error al procesar el token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);
  
  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password);
    if (data.error) {
      throw new Error(data.error);
    }
  };

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      setUser({ token: data.token, name: payload.name });
    } else {
      throw new Error(data.error);
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    logoutUser();
  };

  const authContextValue = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };