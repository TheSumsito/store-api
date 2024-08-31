const express = require('express');
const {
  getAssembled,
  newAssembly,
  assignProduct,
} = require('@controllers/assembledControllers');

const router = express.Router();
router.post('/', getAssembled);
router.post('/create', newAssembly);
router.post('/assign-product', assignProduct);

module.exports = router;