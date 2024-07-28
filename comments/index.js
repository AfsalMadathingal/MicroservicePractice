const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB } = require("./config/db");
const { connectRabbitMQ } = require("./config/rabbitmq");
const {
  listenForNewPosts,
  createComment,
  getComment,
} = require("./controller/commentController");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  const data = await getComment(id);
  res.send(data);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { id } = req.params;
  req.body.postId = id;
  const data = await createComment(req.body);
  res.status(201).send(data);
});

async function startServer() {
  await connectRabbitMQ();

  await listenForNewPosts();

  await connectDB();
  app.listen(4001, () => {
    console.log("listening on 4001");
  });
}

startServer();
