const express = require('express');
const {
  getCategories,
} = require('@controllers/categoriesController');

const router = express.Router();
router.post('/', getCategories);

module.exports = router;