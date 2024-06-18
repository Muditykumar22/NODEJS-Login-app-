const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registration Route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            password
        });

        await user.save();

        // Generate a token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'your_jwt_secret', // Replace with your JWT secret
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate a token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'your_jwt_secret', // Replace with your JWT secret
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
