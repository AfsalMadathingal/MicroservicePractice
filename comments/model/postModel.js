const mongoose = require('mongoose');

const postReferenceSchema = new mongoose.Schema({
  _id: String,
  title: String,
});

module.exports = mongoose.model('PostReference', postReferenceSchema);