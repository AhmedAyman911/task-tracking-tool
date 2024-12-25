const express = require('express');
const router = express.Router();
const SprintBacklog = require('../models/sprintbacklog'); // Ensure this is the correct path
// Add this to sprintbacklog.js
router.post('/add', async (req, res) => {
  try {
      const newBacklog = new SprintBacklog(req.body);
      const savedBacklog = await newBacklog.save();
      res.status(201).json({
          message: 'Sprint Backlog created successfully',
          data: savedBacklog,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});
// Get all sprint backlog items
router.get('/', async (req, res) => {
    try {
        const backlogs = await SprintBacklog.find().populate('sprint');
        res.status(200).json(backlogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a sprint backlog item
router.put('/:id', async (req, res) => {
    try {
        const updatedBacklog = await SprintBacklog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedBacklog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a sprint backlog item
router.delete('/:id', async (req, res) => {
    try {
        await SprintBacklog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
