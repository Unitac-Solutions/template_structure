// routes/hospitalsRoutes.js
const express = require('express');
const axios = require('axios');
const hospitalsController = require('../controllers/hospitalsController');

const router = express.Router();

router.get('/get-nearby-hospitals', async (req, res) => {
    try {
       // Get user's current location using the get-location route
      const locationResponse = await axios.get('http://localhost:9000/api/get-location');
  
      const { latitude, longitude } = locationResponse.data;

        const hospitalsWithDistances = await hospitalsController.getNearbyHospitals(latitude,longitude);
        res.json(hospitalsWithDistances);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
