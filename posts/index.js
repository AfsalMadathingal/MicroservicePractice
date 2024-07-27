const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const amqp = require('amqplib');

const app = express();
const posts = {};

app.use(cors());
app.use(bodyParser.json());

let channel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertExchange('events', 'fanout', { durable: false });
    const { queue } = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue, 'events', '');

    channel.consume(queue, (msg) => {
      if (msg.content) {
        const event = JSON.parse(msg.content.toString());
        console.log("Received Event", event.type);
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

connectRabbitMQ();

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  if (channel) {
    channel.publish('events', '', Buffer.from(JSON.stringify({
      type: "PostCreated",
      data: { id, title }
    })));
  }

  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("listening on 4000");
});