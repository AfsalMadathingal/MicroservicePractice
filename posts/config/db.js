const mongoose = require('mongoose');

async function connectDB() {
  await mongoose.connect('mongodb+srv://madathingalafsal:Afsal%40090797@OURSHOP.mkqpdg9.mongodb.net/post_service_db');
  console.log('Connected to Post Service database');
}

module.exports = { connectDB };