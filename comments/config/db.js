const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb://localhost/comment_service_db');
  console.log('Connected to Comment Service database');
}

module.exports = { connectDB };