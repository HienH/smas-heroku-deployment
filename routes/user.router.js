express = require('express');
const router = express.Router();

// UserController
const userController = require('../controllers/userController');

// Register
router.post('/register', userController.register);

module.exports = router; 
