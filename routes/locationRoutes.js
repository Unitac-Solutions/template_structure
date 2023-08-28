// routes/locationRoutes.js
const express = require('express');
const { getLocation } = require('../controllers/locationController');
const router = express.Router();

router.get('/get-location', getLocation);

module.exports = router;
