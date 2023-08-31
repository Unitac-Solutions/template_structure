const axios = require('axios');

const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const apiEndPoint = process.env.HOSPITALS_API_ENDPOINT;
const etaEndPoint = process.env.ETA_API_ENDPOINT;

async function getNearbyHospitalsWithLocation(req, res) {
    try {
        // Get user's current location using the get-location route
        const locationResponse = await axios.get('http://localhost:9000/api/get-location');
        const { latitude, longitude } = locationResponse.data;

        // Fetch nearby hospitals with distances using the provided logic
        const hospitalsWithDistances = await getNearbyHospitals(latitude, longitude);
        res.json(hospitalsWithDistances);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching hospital distances' });
    }
}

async function getNearbyHospitals(latitude, longitude) {
    try {
        // Fetch nearby hospitals with specific names using Google Places API
        const radius = 30000; // Radius in meters for nearby places search
        const type = 'hospital'; // Type of places to search for
        const specificHospitalNames = ['BOTSHILU PRIVATE HOSPITAL', 'MEDICLINIC', 'NETCARE'];
    
        const nearbyHospitalsUrl = `${apiEndPoint}?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}&name=${specificHospitalNames.join('|')}`;

        const response = await axios.get(nearbyHospitalsUrl);
    
        // Fetch distances from your location to each hospital using the Google Distance Matrix API
        const destinations = response.data.results.map(hospital => `${hospital.geometry.location.lat},${hospital.geometry.location.lng}`).join('|');
    
        const distanceMatrixUrl = `${etaEndPoint}?units=metric&origins=${latitude},${longitude}&destinations=${destinations}&key=${apiKey}`;
    
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
        res.status(500).json({ error: 'An error occurred while nearby hospital' });
    }

}

module.exports = { getNearbyHospitalsWithLocation };
