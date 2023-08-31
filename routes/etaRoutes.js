const express = require('express');
const router = express.Router();
const { getETA } = require('../controllers/etaController');

router.get('/:origin/:destination', getETA);

module.exports = router;
