const Post = require('../model/postModel');
const { getChannel } = require('../config/rabbitmq');

async function createPost(postData) {
  const post = new Post(postData);
  await post.save();

  const channel = getChannel();
  await channel.assertQueue('post_created');
  channel.sendToQueue('post_created', Buffer.from(JSON.stringify(post)));

  return post;
}



async function getPost() {
  const post = await Post.find();
  return post;
}

module.exports = { createPost ,getPost };