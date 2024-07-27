const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const amqp = require('amqplib');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

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

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  if (channel) {
    channel.publish('events', '', Buffer.from(JSON.stringify({
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: req.params.id
      }
    })));
  }

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log("listening on 4001");
});