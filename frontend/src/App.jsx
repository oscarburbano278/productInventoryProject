// frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
// Importa otros componentes de páginas si los tienes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Agrega otras rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;