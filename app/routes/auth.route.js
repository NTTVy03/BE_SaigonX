const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middleware/auth.middleware');

module.exports = function(app) {
    router.post('/register', register);
    router.post('/login', login);
    router.post('/logout', isAuthenticated, logout);

    app.use("/api/auth", router);
}