// routes/locationRoutes.js
const express = require('express');
const { getLocation } = require('../controllers/location.Controller');
const router = express.Router();

router.get('/', getLocation);

module.exports = router;