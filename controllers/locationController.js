require('dotenv').config()
const express = require('express');
const axios = require('axios');


const apiKey = process.env.GOOGLE_MAPS_API_KEY;

async function getLocation(req, res) {
  const userIpAddress = req.ip;

  try {
    // Get user's location based on IP address using Google Geolocation API
    const response = await axios.post(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`
    );
    const { lat, lng } = response.data.location;

    // Perform reverse geocoding using Google Geocoding API
    const geocodingResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    const placeName = geocodingResponse.data.results[0].formatted_address;
    const city = geocodingResponse.data.results[0].address_components.find(
      component => component.types.includes('locality')
    ).long_name;

    const location = {
      placeName,
      city,
      latitude: lat,
      longitude: lng,
    };

    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
}

module.exports = {
  getLocation,
};
