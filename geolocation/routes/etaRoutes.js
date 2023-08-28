const express = require('express');
const { calculateETA } = require('../controllers/etaController');

const router = express.Router();

router.get('/:origin/:destination', async (req, res) => {
    try {
      const { origin, destination } = req.params;
      const etaData = await calculateETA(origin, destination);
  
      res.json(etaData);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = router;
