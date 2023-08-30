// controllers/hospitalsController.js
const axios = require('axios');

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

const getNearbyHospitals = async (latitude, longitude) => {
    try {
        // Fetch nearby hospitals with specific names using Google Places API
        const radius = 30000; // Radius in meters for nearby places search
        const type = 'hospital'; // Type of places to search for
        const specificHospitalNames = ['BOTSHILU PRIVATE HOSPITAL', 'MEDICLINIC', 'NETCARE'];
    
        const nearbyHospitalsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}&name=${specificHospitalNames.join('|')}`;

        const response = await axios.get(nearbyHospitalsUrl);
    
        // Fetch distances from your location to each hospital using the Google Distance Matrix API
        const destinations = response.data.results.map(hospital => `${hospital.geometry.location.lat},${hospital.geometry.location.lng}`).join('|');
    
        const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${latitude},${longitude}&destinations=${destinations}&key=${apiKey}`;
    
        const distanceMatrixResponse = await axios.get(distanceMatrixUrl);
    
        // Process and format hospital data
        const hospitalsWithDistances = response.data.results.map((hospital, index) => {
            const distanceText = distanceMatrixResponse.data.rows[0].elements[index].distance.text;
          
            return {
                name: hospital.name,
                distance: distanceText
            };
        });
    
        return hospitalsWithDistances;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while fetching nearby hospitals');
    }
};

module.exports = { getNearbyHospitals };
