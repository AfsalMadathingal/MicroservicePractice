const Comment = require('../model/commentModel');
const PostReference = require('../model/postModel');
const { getChannel } = require('../config/rabbitmq');
const { default: mongoose } = require('mongoose');

async function listenForNewPosts() {
    const channel = getChannel();
    await channel.assertQueue('post_created');
    channel.consume('post_created', async (msg) => {
      if (msg !== null) {
        const post = JSON.parse(msg.content.toString());
        console.log('New post created:', post);
        const {_id, title} = post;
        const postReference = new PostReference({_id, title});
        await postReference.save();
        console.log(`Initialized comment document for post ${post._id}`);
        channel.ack(msg);
      }
    });
  }

async function createComment(commentData) {

  const postReference = await PostReference.findById(commentData.postId);

  if (!postReference) {
    throw new Error('Post not found or has been deleted');
  }
  const comment = new Comment(commentData);
  await comment.save();
  return comment;
}


async function getComment(id) {
  const comments = await Comment.find({postId: id});
  console.log('====================================');
  console.log(comments);
  console.log('====================================');
  return comments;
}

module.exports = { listenForNewPosts, createComment , getComment };