const kafkaService = require('../Services/kafkaHospitalService');

const sendHospitalMessage = async (req, res) => {
  try {
    const { topic, message } = req.body;
    await kafkaService.sendMessage(topic, message);
    res.json({ success: true, message: 'Hospital Message sent successfully' });
  } catch (error) {
    console.error('Error sending hospital message to Kafka:', error);
    res.status(500).json({ error: 'Error sending message to Kafka' });
  }
};

const getHospitalMessages = (req, res) => {
    try {
      const messages =  kafkaService.getMessages();
      res.json(messages);
    } catch (error) {
      console.error('Error fetching hospital messages:', error);
      res.status(500).json({ error: 'Error fetching message from Kafka' });
    }
  };

module.exports = {
  sendHospitalMessage,
  getHospitalMessages,
};
