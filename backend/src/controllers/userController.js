const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');


exports.registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        if(!email) {
            return res.status(400).json({message: 'Please, provide email'})
        }
        if(!name)  {
            return res.status(400).json({message: 'Please, provide username'})
        }
        if(!password){
            return res.status(400).json({message: 'Please, type password'})
        }
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User already exists, please log in' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if(!email) {
            return res.status(400).json({message: 'Please, provide email'})
        }

        if(!password){
            return res.status(400).json({message: 'Please, type password'})
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User with this email does not exists' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

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
