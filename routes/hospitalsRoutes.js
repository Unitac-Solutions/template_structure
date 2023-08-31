const express = require('express');
const router = express.Router();
const { getNearbyHospitalsWithLocation } = require('../controllers/hospitalsController'); 

router.get('/get-nearby-hospitals', getNearbyHospitalsWithLocation);

module.exports = router;
