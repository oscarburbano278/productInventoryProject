// backend/src/routes/product.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
// 1. Importar el middleware de autenticación
const authenticateToken = require('../middlewares/auth.middleware');

// 2. Aplicar el middleware a todas las rutas de productos
// La autenticación se ejecutará antes de cada controlador
router.get('/', authenticateToken, productController.getProducts);
router.post('/', authenticateToken, productController.createProduct);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

module.exports = router;