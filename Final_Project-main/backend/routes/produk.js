const express = require('express');
const router = express.Router();
const productController = require('../controller/produk');
const path = require('path')

// Your existing routes
router.get('/produk/:id', productController.getProductsById);
router.get('/produk', productController.getProducts);

// New route for adding a product
router.post('/produk', productController.addProduct);

module.exports = router;

