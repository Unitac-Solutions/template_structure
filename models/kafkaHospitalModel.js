const kafka = require('kafka-node');

const kafkaClient = new kafka.KafkaClient({
  clientId: process.env.CLIENT_ID,
  kafkaHost: process.env.KAFKA_HOST,
});

const producer = new kafka.Producer(kafkaClient);

producer.on('ready', () => {
  console.log('Kafka hospital producer is ready');
});

producer.on('error', (error) => {
  console.error('Kafka producer error:', error);
});

const consumer = new kafka.Consumer(kafkaClient, [{ topic: 'hospital-topic' }]);

consumer.on('error', (error) => {
  console.error('Kafka consumer error:', error);
});

const messages = [];

consumer.on('message', (message) => {
  try {
    console.log('Received message:', message.value);
    const hospitalData = JSON.parse(message.value); // Parse the JSON string into an object
    messages.push(hospitalData);
  } catch (error) {
    console.error('Error processing Kafka message:', error);
  }
});

const sendMessage = (topic,message,availability) => {
  const hospitalData = {message,availability};
  const hospitalMessage = JSON.stringify(hospitalData); // Convert the object to a JSON string
  return new Promise((resolve, reject) => {
    producer.send(
      [
        {
          topic,
          messages: [hospitalMessage], // Send the JSON string as the message
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
}

module.exports = {
  sendMessage,
  getMessages,
};
