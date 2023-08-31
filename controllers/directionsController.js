const axios = require('axios');
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const directionsApiEndpoint = process.env.DIRECTIONS_API_ENDPOINT;
const errorHandler = require('../middlewares/errorHandler');

async function getDirections(req, res) {
  const { origin, destination } = req.query;

  try {
    const response = await axios.get(
      `${directionsApiEndpoint}?origin=${origin}&destination=${destination}&key=${apiKey}`
    );

    const routes = response.data.routes;
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching directions' });
  }
}

module.exports = {
  getDirections,
};
