const express = require('express');
const {
  getProducts,
  newProduct,
} = require('@controllers/productController');

const router = express.Router();
router.post('/', getProducts);
router.post('/create', newProduct);

module.exports = router;
