// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthContext.jsx'; // ¡Sin llaves!
import AppRouter from './routes/AppRouter.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthProvider>
  );
}

export default App;