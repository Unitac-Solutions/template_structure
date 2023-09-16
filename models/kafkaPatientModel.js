const kafka = require('kafka-node');

const kafkaClient = new kafka.KafkaClient({
  clientId: process.env.CLIENT_ID,
  kafkaHost: process.env.KAFKA_HOST
});

const producer = new kafka.Producer(kafkaClient);

producer.on('ready', () => {
  console.log('Kafka patient producer is ready');
});

producer.on('error', (error) => {
  console.error('Kafka producer error:', error);
});

const consumer = new kafka.Consumer(kafkaClient, [
  { topic: 'patient-topic' }, // Replace with your topic name
]);

consumer.on('error', (error) => {
  console.error('Kafka consumer error:', error);
});

const messages = [];

consumer.on('message', (message) => {
  try {
    console.log('Received message:', message.value);
    messages.push(JSON.parse(message.value)); // Parse the JSON string to an object
  } catch (error) {
    console.error('Error processing Kafka message:', error);
  }
});

const sendMessage = (topic, dataObject) => {
  const message = JSON.stringify(dataObject); // Convert the object to a JSON string
  return new Promise((resolve, reject) => {
    producer.send(
      [
        {
          topic,
          messages: [message], // Send the JSON string as the message
        },
      ],
      (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const getMessages = () => {
  return messages;
};

module.exports = {
  sendMessage,
  getMessages,
};
