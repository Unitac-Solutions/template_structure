require('dotenv').config()
const axios = require('axios');
const config = require('../config/constants');

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

async function calculateETA(origin, destination) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`
    );

    const durationInSeconds = response.data.rows[0].elements[0].duration.value;
    const currentTime = new Date();
    const eta = new Date(currentTime.getTime() + durationInSeconds * 1000);

    const countdown = Math.floor((eta - currentTime) / 1000);

    return {
      eta: eta.toString(),
      countdown: formatTime(countdown),
    };
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('An error occurred while calculating ETA.');
  }
}

module.exports = {
  calculateETA,
};
