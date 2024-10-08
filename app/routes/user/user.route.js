const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../../middleware/auth.middleware');
const UserAccountController = require('../../controllers/user/user.controller');

router.get('/', UserAccountController.getUserInfo);
router.get('/player', UserAccountController.getPlayerData);

router.post('/avatar', authenticateJWT, UserAccountController.updateUserAvatar);

module.exports = router;