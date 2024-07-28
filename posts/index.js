const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const { connectDB } = require("./config/db");
const { connectRabbitMQ } = require("./config/rabbitmq");
const { createPost, getPost } = require("./controller/postController");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));

app.get("/posts", async (req, res) => {
  const post = await getPost();
  console.log(post);
  res.send(post);
});

app.post("/posts", async (req, res) => {
  const post = await createPost(req.body);
  console.log(post);

  res.status(201).send(post);
});

async function startServer() {
  try {
    await connectRabbitMQ();
    console.log("Connected to RabbitMQ");
    app.listen(4000, () => {
      console.log("listening on 4000");
    });
  } catch (error) {
    console.error("Failed to connect to RabbitMQ retry", error);
    await connectRabbitMQ();
    throw error;
  }
}

connectDB();
startServer();
