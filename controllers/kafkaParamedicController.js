const kafkaService = require('../Services/kafkaParamedicService');
const axios = require('axios');

const sendParamedicMessage = async (req, res) => {
  try {
    // Make an Axios request to fetch data
    const response = await axios.get('http://localhost:3001/api/kafkaParamedic');
    const data = response.data;

    // Check if data is an array and has at least one element
    if (Array.isArray(data) && data.length > 0) {
      // Get the latest latitude and longitude values from the last element
      const latestData = data[data.length - 1];
      const platitude = latestData.latitude;
      const plongitude = latestData.longitude;

      console.log('Latest latitude:', platitude);
      console.log('Latest longitude:', plongitude);

      const locationResponse = await axios.get('http://localhost:3001/api/get-location');
      const { latitude, longitude} = locationResponse.data;

      console.log('Paramedic latitude:', latitude);
      console.log('Paramedic longitude:', longitude);


      const etaResponse = await axios.get(`http://localhost:3001/api/eta/${latitude},${longitude}/${platitude},${plongitude}`);
      const { eta } = etaResponse.data;

      //console.log('The ETA IS: ',eta);

      res.json({ success: true, message: 'Paramedic Message sent successfully' });
    } else {
      console.error('No data available or invalid data format.');
      res.status(500).json({ error: 'Invalid data format or no data available' });
    }

    const paramedicCaseResponse = await axios.get('http://localhost:3001/api/patientcase/5');//will be replaced by id
    const { case_id,open_case, patient_id, incident_id,clinical_id, hospital_id, clinical_detail_id } = paramedicCaseResponse.data;
    
    console.log('hjhhjkhkj',case_id);
    // Destructure the request body
    const { topic, paramedicName,companyName} = req.body;
    // Call your Kafka service and send the data
    await kafkaService.sendMessage(topic,case_id,open_case, patient_id, incident_id,clinical_id, hospital_id, clinical_detail_id,paramedicName, companyName);

  } catch (error) {
    console.error('Error sending paramedic message to Kafka:', error);
    res.status(500).json({ error: 'Error sending message to Kafka' });
  }
};

const getParamedicMessages = (req, res) => {
  try {
    const messages = kafkaService.getMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching paramedic messages:', error);
    res.status(500).json({ error: 'Error fetching message from Kafka' });
  }
};

module.exports = {
  sendParamedicMessage,
  getParamedicMessages,
};
