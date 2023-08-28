const axios = require('axios');
const config = require('../config/constants');

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

async function getDirections(origin, destination) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
    );

    const routes = response.data.routes;
    return routes;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred while fetching directions.');
  }
}

module.exports = {
  getDirections,
};
