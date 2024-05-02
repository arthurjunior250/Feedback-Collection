// feedback.route.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback.model');

// POST route to save new feedback entry
router.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).send(feedback);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to retrieve all feedback entries
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.send(feedbacks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to edit feedback
router.put('/feedback/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, message, rating } = req.body;
  
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(id, { name, email, message, rating }, { new: true });
      res.json(updatedFeedback);
    } catch (error) {
      console.error('Error updating feedback:', error);
      res.status(500).json({ error: 'Error updating feedback' });
    }
  });
  
  // Route to delete feedback
  router.delete('/feedback/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Feedback.findByIdAndDelete(id);
      res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      console.error('Error deleting feedback:', error);
      res.status(500).json({ error: 'Error deleting feedback' });
    }
  });
  

module.exports = router;
