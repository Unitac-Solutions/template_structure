const kafkaService = require('../Services/kafkaPatientService');
const axios = require('axios');

const sendPatientMessage = async (req, res) => {
  try {
    //Getting Location of the patient
    const locationResponse = await axios.get('http://localhost:3001/api/location');
    const { latitude, longitude,placeName,city } = locationResponse.data;
    console.log(city);

    const parientCaseResponse = await axios.get('http://localhost:3001/api/patientcase/5');//will be replaced by id
    const { case_id,open_case, patient_id, incident_id,clinical_id, hospital_id, clinical_detail_id } = parientCaseResponse.data;
    console.log( parientCaseResponse.data);

    const { topic} = req.body;
    
    //Andy sending all info to kafka
    await kafkaService.sendMessage(topic,case_id, open_case,patient_id, incident_id,clinical_id, hospital_id, clinical_detail_id, latitude,longitude,placeName,city);
    res.json({ success: true, message: 'Patient Message sent successfully' });
  } catch (error) {
    console.error('Error sending patient message to Kafka:', error);
    res.status(500).json({ error: 'Error sending message to Kafka' });
  }
};

const getPatientMessages = (req, res) => {
  try {
    const messages = kafkaService.getMessages();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching patient messages:', error);
    res.status(500).json({ error: 'Error fetching message from Kafka' });
  }
};

module.exports = {
  sendPatientMessage,
  getPatientMessages,
};
