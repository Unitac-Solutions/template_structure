const kafkaPatientModel = require('../Models/kafkaPatientModel');

const sendMessage = (topic, message) => {
  return kafkaPatientModel.sendMessage(topic, message);
};

const getMessages = () => {
  return kafkaPatientModel.getMessages();
};

module.exports = {
  sendMessage,
  getMessages,
};
