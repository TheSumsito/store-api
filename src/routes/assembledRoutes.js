const express = require('express');
const {
  getAssembled,
} = require('@controllers/assembledControllers');

const router = express.Router();
router.post('/', getAssembled);

module.exports = router;