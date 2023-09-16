const kafkaPatientModel = require('../Models/kafkaPatientModel');

const sendMessage = (topic,case_id, open_case,patient_id, incident_id,clinical_id, hospital_id, clinical_detail_id, latitude,longitude,placeName,city) => {
  // Create an object to hold all the fields
  const dataObject = {
    topic,
    case_id,
    open_case,
    patient_id,
    hospital_id,
    incident_id,
    clinical_detail_id,
    clinical_id,
    latitude,
    longitude,
    placeName,
    city,
  };

  return kafkaPatientModel.sendMessage(topic, dataObject);
};

const getMessages = () => {
  return kafkaPatientModel.getMessages();
};

module.exports = {
  sendMessage,
  getMessages,
};
