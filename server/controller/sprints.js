const express = require("express");
const router = express.Router();
const SprintModel = require("../models/Sprint");

// POST: Add a new sprint task
router.post('/', async (req, res) => {
  try {
    const task = new SprintModel(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/tasks', async (req, res) => {
  const { projectId } = req.query;
  try {
    const sprints = projectId
      ? await SprintModel.find({ projectId }) 
      : await SprintModel.find();

    res.status(200).json(sprints);
  } catch (error) {
    console.error("Error retrieving sprint tasks:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
//update sprint number
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { sprint } = req.body;

  try {
    const updatedTask = await SprintModel.findByIdAndUpdate(
      id,
      { sprint },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete a sprint task
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await SprintModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// PUT: Update a sprint task
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { task_name, role, from, to } = req.body;

  if (!task_name || !role || !from || !to) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const updatedTask = await SprintModel.findByIdAndUpdate(
      id,
      { task_name, role, from, to },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.status(200).json({ message: "Task updated successfully!", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
