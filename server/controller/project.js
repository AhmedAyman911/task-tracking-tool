const express = require('express');
const router = express.Router();
const projectModel = require('../models/Project');

router.post('/new', async (req, res) => {
    try {
        const project = new projectModel(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await projectModel.find({ managerId: id }); 
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const projects = await projectModel.find(); 
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;