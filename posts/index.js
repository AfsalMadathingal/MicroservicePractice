const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const {connectDB} = require('./config/db');
const { connectRabbitMQ } = require("./config/rabbitmq");
const { createPost, getPost } = require("./controller/postController");



app.use(cors());
app.use(bodyParser.json());


app.get("/posts", async (req, res) => {

  const post = await getPost()
  console.log(post);
  res.send(post);


});

app.post("/posts", async (req, res) => {


  const post = await createPost(req.body)
  console.log(post);

  res.status(201).send(post);
});

connectRabbitMQ()

connectDB()

app.listen(4000, () => {
  console.log("listening on 4000");
});