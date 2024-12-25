const express = require("express");
const router = express.Router();
const SprintModel = require("../models/Sprint");

// POST: Add a new sprint task
router.post("/add", async (req, res) => {
  const { sprint, task_name, role, from, to } = req.body;

  if (!task_name || !role || !from || !to) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newSprint = new SprintModel({
      sprint,
      task_name,
      role,
      from,
      to,
    });

    await newSprint.save();

    res.status(201).json({ message: "Sprint saved successfully!" });
  } catch (error) {
    console.error("Error saving sprint:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET: Retrieve all sprint tasks
router.get("/tasks", async (req, res) => {
  try {
    const sprints = await SprintModel.find();
    res.status(200).json(sprints);
  } catch (error) {
    console.error("Error retrieving sprint tasks:", error);
    res.status(500).json({ error: "Internal server error." });
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
