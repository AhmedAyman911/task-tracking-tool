const express = require('express');
const router = express.Router();
const BacklogItem = require('../models/backlog');


router.post('/add', async (req, res) => {
    try {
        const backlogItem = new BacklogItem(req.body);
        await backlogItem.save();
        res.status(201).json(backlogItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const { projectId } = req.query;
    try {
        const items = projectId
              ? await BacklogItem.find({ projectId })
              : await BacklogItem.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await BacklogItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await BacklogItem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
