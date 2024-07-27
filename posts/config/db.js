const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb://localhost/post_service_db');
  console.log('Connected to Post Service database');
}

module.exports = { connectDB };