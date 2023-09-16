// routes/locationRoutes.js
const express = require('express');
const { getLocation } = require('../Controllers/locationController');
const router = express.Router();
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.get('/get-location', getLocation);

module.exports = router;
