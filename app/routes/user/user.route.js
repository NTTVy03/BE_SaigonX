const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../../middleware/auth.middleware');
const { isAccessMap, isOpenMap } = require('../../middleware/map.middleware');
const UserAccountController = require('../../controllers/user/user.controlller');

router.get('/', authenticateJWT, UserAccountController.getUserInfo);
router.get('/player', authenticateJWT, UserAccountController.getPlayerData);

module.exports = router;