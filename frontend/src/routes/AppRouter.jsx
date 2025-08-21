// frontend/src/routes/AppRouter.jsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Importa todos los componentes necesarios
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductForm from '../pages/ProductForm';
import NotFound from '../pages/NotFound';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';

// Componente para las rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Redirige a la página de inicio de sesión si el usuario no está autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Componente principal de enrutamiento
export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas de autenticación (no protegidas) */}
      <Route path="/" element={<RegisterPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas para el CRUD de productos */}
      <Route path="/products" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/products/new" element={
        <ProtectedRoute>
          <ProductForm />
        </ProtectedRoute>
      } />
      <Route path="/products/:id/edit" element={
        <ProtectedRoute>
          <ProductForm />
        </ProtectedRoute>
      } />

      {/* Ruta para URLs no definidas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}



