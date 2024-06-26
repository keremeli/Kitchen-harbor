
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/allusers', userController.getAllUsers);

router.get('/username/:username', userController.getUserByUsername);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/:userId', userController.getUserById);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;
