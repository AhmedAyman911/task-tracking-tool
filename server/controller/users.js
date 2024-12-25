const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Get all users except managers
router.get('/team', async (req, res) => {
    try {
        const users = await UserModel.find({ role: { $ne: 'manager' } }, { id: 1, name: 1 });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

router.post('/signup', async (req, res) => {
    const { name, password, email, role } = req.body;
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({ name, password: hashedPassword, email, role });
        res.status(201).json(user); // Success: 201 Created
    } catch (err) {
        if (err.code === 11000) {
            // Handle duplicate email error
            res.status(400).json({ message: "Email already exists" });
        } else {
            // Handle other errors
            res.status(500).json({ message: "Internal server error" });
        }
    }
});

router.post('/login', async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json("No user found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json("Incorrect password");
        }
        const token = jwt.sign(
            { id: user._id, name: user.name },
            'your_jwt_secret', 
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Logged in successfully!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role:user.role
            }
        });
    } catch (err) {
        res.status(500).json("Server error");
    }
});
router.get('/get-token', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token found' });
    }
    // Optionally, you can verify and decode the token here
    res.json({ token });
});

router.get('/get-token', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token found' });
    }
    // Optionally, you can verify and decode the token here
    res.json({ token });
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