const express = require('express');
const router = express.Router();
const directionsController = require('../controllers/directionsController');

router.get('/', async (req, res) => {
  const { origin, destination } = req.query;

  try {
    const routes = await directionsController.getDirections(origin, destination);
    res.json(routes);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
