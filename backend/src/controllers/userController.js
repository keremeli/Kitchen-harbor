const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const { use } = require('../routes/userRoute');
const { secretKey } = require('../../config/config');

exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.findAll();
        // Send the users as a response
        res.json(users);
    } catch (error) {
        // If there's an error, send a 500 status code along with the error message
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


exports.getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// userController.js
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Please provide an email' });
        }
        if (!username) {
            return res.status(400).json({ message: 'Please provide a username' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Please type a password' });
        }
        let user = await User.findOne({ where: { username } });
        if (user) {
            return res.status(400).json({ message: 'User already exists, please log in' });
        }

        user = await User.create({ username, email, password });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Please provide a username' });
        }

        if (!password) {
            return res.status(400).json({ message: 'Please type a password' });
        }

        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'User with this username does not exist' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if userId is undefined or not provided
        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing or invalid' });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const updatedUserData = req.body;

        const [updatedRowsCount] = await User.update(updatedUserData, {
            where: { id: userId },
        });

        if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await User.findByPk(userId);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedRowCount = await User.destroy({ where: { id: userId } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
