const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const amqp = require('amqplib')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const posts = {};

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
        handleEvent(event.type, event.data);
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

function handleEvent(type, data) {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.log('Event Processed', { type, data });
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

async function startServer() {
  await connectRabbitMQ();

  app.listen(4002, () => {
    console.log('Listening on 4002');
  });
}

startServer();