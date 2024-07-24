const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../../middleware/auth.middleware');
const {  UserLandController } = require('../../controllers/user');

// router.get("/"   , authenticateJWT, UserLandController.getUserMapsOpen);
// router.get("/:mapId", authenticateJWT, isOpenMap, UserMapController.getUserMapDetail);
// router.post('/:mapId', authenticateJWT, UserMapController.postPlayerOpenMap);


// router.get("/:mapId/land", authenticateJWT, isAccessMap, mapController.getUserLandsOpen);


module.exports = router;