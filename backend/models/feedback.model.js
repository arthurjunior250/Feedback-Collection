// feedback.model.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  rating: Number,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
