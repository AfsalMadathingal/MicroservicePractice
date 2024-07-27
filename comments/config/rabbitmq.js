const amqp = require('amqplib');

let channel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    console.log('Connecting to RabbitMQ...');
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
    throw error;
  }
}

function getChannel() {
  if (!channel) throw new Error('RabbitMQ channel not established');
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };