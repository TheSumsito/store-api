const express = require('express');
const { myAssembled } = require('../controllers/assembledControllers');

const router = express.Router();
router.post('/', myAssembled);

module.exports = router;