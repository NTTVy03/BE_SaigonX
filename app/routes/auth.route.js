const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');
const { authenticateJWT } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateJWT, logout);

module.exports = router;