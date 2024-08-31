const express = require('express');
const {
  getAssembled,
  newAssembly,
} = require('@controllers/assembledControllers');

const router = express.Router();
router.post('/', getAssembled);
router.post('/create', newAssembly);

module.exports = router;