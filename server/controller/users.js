const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

router.post('/signup', async (req, res) => {
    const { name,password,email } = req.body;
    UserModel.create({ name,password,email,role })
        .then(users => { res.json(users); })
        .catch(err => res.json(err))
});
router.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//edit user
router.get('/users/:id', async (req, res) => {
    try {
        const users = await UserModel.findById(req.params.id);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const updateduser = await UserModel.findByIdAndUpdate(userId, req.body, { new: true });
        res.json(updateduser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//delete user
router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        await UserModel.findByIdAndDelete(userId);
        res.status(200).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router;