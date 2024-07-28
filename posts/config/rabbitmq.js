const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {
  while (true) {
    try {
      const connection = await amqp.connect(
       process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672'
      );

      channel = await connection.createChannel();
      console.log("Connected to RabbitMQ");
      break;
    } catch (error) {
      console.error("Failed to connect to RabbitMQ", error);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

function getChannel() {
  if (!channel) throw new Error("RabbitMQ channel not established");
  return channel;
}

module.exports = { connectRabbitMQ, getChannel };
