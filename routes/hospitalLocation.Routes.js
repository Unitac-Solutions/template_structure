// routes/locationRoutes.js
const express = require('express');
const { getNearbyHospitalsWithLocation } = require('../controllers/hospitalLocation.Controller');
const router = express.Router();

router.get('/', getNearbyHospitalsWithLocation);

module.exports = router;