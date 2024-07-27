const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let channel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertExchange('events', 'fanout', { durable: false });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

connectRabbitMQ();

app.post('/events', async (req, res) => {
  const event = req.body;
  console.log('Event Received', event);

  if (channel) {
    channel.publish('events', '', Buffer.from(JSON.stringify(event)));
  }

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});