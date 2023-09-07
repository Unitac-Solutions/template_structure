const kafkaHospitalModel = require('../Models/kafkaHospitalModel');

const sendMessage = (topic, message) => {
  return kafkaHospitalModel.sendMessage(topic, message);
};

const getMessages = () => {
  return kafkaHospitalModel.getMessages();
};

module.exports = {
  sendMessage,
  getMessages,
};
