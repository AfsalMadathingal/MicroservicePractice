const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { connectRabbitMQ } = require('./config/rabbitmq');
const { listenForNewPosts, createComment } = require('./controller/commentController');
const app = express();





app.use(cors());
app.use(bodyParser.json());



app.get('/posts/:id/comments', (req, res) => {



});

app.post('/posts/:id/comments', async (req, res) => {
  
  await createComment(req.body)

});

async function startServer() {

  await connectRabbitMQ()
  await listenForNewPosts()
  await connectDB()
  app.listen(4001, () => {
    console.log("listening on 4001");
  });

  
}

startServer()


