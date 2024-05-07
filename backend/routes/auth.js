const express = require('express');
const router = express.Router();

// Import your controller functions
const { signup, login, userProfile, deleteUserById, getAllUsers, updateProfile } = require('../controllers/auth.controllers');

// Define your routes with corresponding controller functions
router.post('/signup', signup);
router.post('/login', login);
router.get('/user-profile', userProfile);
router.delete('/:id', deleteUserById);
router.get('/', getAllUsers);
router.put("/:id", updateProfile);

module.exports = router;
