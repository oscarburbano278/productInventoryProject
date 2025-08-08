const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Obtener todos los productos
router.get('/', productController.getProducts);

// Crear un producto
router.post('/', productController.createProduct);

// Editar un producto
router.put('/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;