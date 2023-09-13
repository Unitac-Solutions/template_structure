// routes/locationRoutes.js
const express = require('express');
const { getLocation } = require('../controllers/location.Controller');
const router = express.Router();
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.get('/', getLocation);

module.exports = router;