import * as dotenv from 'dotenv';
dotenv.config();

import { Kafka } from 'kafkajs';
import twilio from 'twilio';

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const kafka = new Kafka({
  clientId: 'todo-app-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'todo-notifications' });

export const startConsumer = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: 'todo-notifications', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        //@ts-ignore
        const data = JSON.parse(message.value.toString());
        console.log(`Processing message: ${message.value}`);
        
        // Send email notification using Twilio SendGrid or SMS
        await sendNotification(data);
      },
    });
    
    console.log('Consumer started successfully');
  } catch (error) {
    console.error('Error starting consumer:', error);
  }
};

//@ts-ignore
async function sendNotification(data) {
  try {
    // You can use Twilio's SMS service
    await twilioClient.messages.create({
      body: `New Todo Added: ${data.title}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      //@ts-ignore
      to: process.env.USER_PHONE_NUMBER // You might want to store this in your user model
    });
    
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}