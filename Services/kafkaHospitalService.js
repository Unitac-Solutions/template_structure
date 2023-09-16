const kafkaHospitalModel = require('../Models/kafkaHospitalModel');

const sendMessage = (topic, message, availability) => {
  return kafkaHospitalModel.sendMessage(topic, message, availability);
};

const getMessages = () => {
  return kafkaHospitalModel.getMessages();
};

module.exports = {
  sendMessage,
  getMessages,
};
