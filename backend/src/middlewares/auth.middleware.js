// backend/src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

// Obtener la clave secreta desde las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'mi-clave-secreta';

const authenticateToken = (req, res, next) => {
  // 1. Obtener el token del encabezado de la petición
  const authHeader = req.headers['authorization'];
  // El formato es "Bearer TOKEN", así que separamos el token
  const token = authHeader && authHeader.split(' ')[1];

  // 2. Si no hay token, devolver un error 401 (Unauthorized)
  if (token == null) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }

  // 3. Verificar el token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // Si el token no es válido o ha expirado, devolver un 403 (Forbidden)
      return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
    // Si el token es válido, guardar los datos del usuario en la petición
    // para que las rutas puedan acceder a ellos (por ejemplo, `req.user.id`)
    req.user = user;
    // Continuar con la siguiente función en la cadena de middleware
    next();
  });
};

module.exports = authenticateToken;