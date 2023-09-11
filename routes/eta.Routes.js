const express = require('express');
const router = express.Router();
const { getETA } = require('../controllers/eta.Controller');

router.get('/:origin/:destination', getETA);

module.exports = router;