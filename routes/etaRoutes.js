const express = require('express');
const router = express.Router();
const { getETA } = require('../controllers/etaController');
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.get('/:origin/:destination', getETA);

module.exports = router;
