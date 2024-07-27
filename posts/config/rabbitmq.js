const amqp = require('amqplib');

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
}

function getChannel() {
  if (!channel) throw new Error('RabbitMQ channel not established');
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };