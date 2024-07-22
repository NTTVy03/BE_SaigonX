const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../../middleware/auth.middleware');
const UserAccountController = require('../../controllers/user/user.controller');

router.get('/', authenticateJWT, UserAccountController.getUserInfo);
router.get('/player', authenticateJWT, UserAccountController.getPlayerData);

module.exports = router;