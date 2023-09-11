const express = require('express');
const router = express.Router();
const directionsController = require('../controllers/directions.Controller');

router.route('/').get(directionsController.getDirections);

module.exports = router;