const express = require('express');
const { registerUser, loginUser } = require('../controllers/UserController'); // Ensure these function names are correct

const router = express.Router();

// User registration route
router.post('/register', registerUser);  // Use registerUser instead of register

// User login route
router.post('/login', loginUser);  // Add login route if needed

module.exports = router;
