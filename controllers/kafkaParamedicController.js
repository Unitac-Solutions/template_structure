const kafkaService = require('../Services/kafkaParamedicService');
  
  const sendParamedicMessage = async (req, res) => {
    try {
      const { topic, message } = req.body;
      await kafkaService.sendMessage(topic, message);
      res.json({ success: true, message: 'Paramedic Message sent successfully' });
    } catch (error) {
      console.error('Error sending paramedic message to Kafka:', error);
      res.status(500).json({ error: 'Error sending message to Kafka' });
    }
  };
  

const getParamedicMessages = (req, res) => {
    try {
      const messages =  kafkaService.getMessages();
      res.json(messages);
    } catch (error) {
      console.error('Error fetching  paramedic messages:', error);
      res.status(500).json({ error: 'Error fetching message from Kafka' });

    }
  };

  module.exports = {
    sendParamedicMessage,
    getParamedicMessages,
  };