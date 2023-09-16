const express = require('express');
const router = express.Router();
const directionsController = require('../Controllers/directions.Controller');
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");
router.route('/').get(directionsController.getDirections);

module.exports = router;
