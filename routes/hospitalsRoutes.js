const express = require('express');
const router = express.Router();
const { getNearbyHospitalsWithLocation } = require('../controllers/hospitalsController'); 
const { checkToken, checkTokenAndAdmin,checkTokenASuperdAdmin} = require("../middleware/token_validation");

router.get('/get-nearby-hospitals', getNearbyHospitalsWithLocation);

module.exports = router;
