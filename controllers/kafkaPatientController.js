const kafkaService = require('../Services/kafkaPatientService');

const sendPatientMessage = async (req, res) => {
    try {
      const { topic, message } = req.body;
      await kafkaService.sendMessage(topic, message);
      res.json({ success: true, message: 'Patient Message sent successfully' });
    } catch (error) {
      console.error('Error sending patient message to Kafka:', error);
      res.status(500).json({ error: 'Error sending message to Kafka' });
    }
  };

  const getPatientMessages = (req, res) => {
    try {
      const messages =  kafkaService.getMessages();
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