const kafkaParamedicModel = require('../Models/kafkaParamedicModel');

const sendMessage = (topic ,case_id,open_case, patient_id, incident_id,clinical_id, hospital_id, clinical_detail_id,paramedicName,companyName,eta) => {
  return kafkaParamedicModel.sendMessage(topic,case_id,open_case, patient_id, incident_id,clinical_id, hospital_id, clinical_detail_id,paramedicName,companyName,eta);
};


const getMessages = () => {
  return kafkaParamedicModel.getMessages();
};

module.exports = {
  sendMessage,
  getMessages,
};
