import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'todo-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

export const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('Producer connected successfully');
  } catch (error) {
    console.error('Error connecting producer:', error);
  }
};

export const disconnectProducer = async () => {
  await producer.disconnect();
};

//@ts-ignore
export const sendMessage = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [
        { value: JSON.stringify(message) }
      ],
    });
    console.log(`Message sent to topic: ${topic}`);
    return true;
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
};