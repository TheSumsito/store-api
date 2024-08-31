const express = require('express');
const {
  getCategories,
  newCategory,
} = require('@controllers/categoriesController');

const router = express.Router();
router.post('/', getCategories);
router.post('/create', newCategory);

module.exports = router;