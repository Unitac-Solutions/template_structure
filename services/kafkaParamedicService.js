const kafkaParamedicModel = require('../Models/kafkaParamedicModel');

const sendMessage = (topic, message) => {
  return kafkaParamedicModel.sendMessage(topic, message);
};

const getMessages = () => {
  return kafkaParamedicModel.getMessages();
};

module.exports = {
  sendMessage,
  getMessages,
};
