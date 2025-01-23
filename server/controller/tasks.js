const express = require('express');
const router = express.Router();
const TaskModel = require('../models/Task'); // Task model

router.post('/', async (req, res) => {
  try {
    const task = new TaskModel(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/', async (req, res) => {
  const { projectId } = req.query; // Use query parameter to filter by projectId

  try {
    const tasks = projectId
      ? await TaskModel.find({ projectId }) // Filter tasks by projectId
      : await TaskModel.find(); // Return all tasks if no projectId provided

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const task = await TaskModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// Delete task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;