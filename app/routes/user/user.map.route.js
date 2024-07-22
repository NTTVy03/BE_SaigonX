const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../../middleware/auth.middleware');


// router.get("/user/map"   , authenticateJWT, mapController.getUserMapsOpen);
// router.get("/user/map/:mapId", authenticateJWT, isOpenMap, mapController.getUserMapDetail);
// router.post('/user/map/:mapId', authenticateJWT, mapController.postPlayerOpenMap);
// router.get("/user/map/:mapId/land", authenticateJWT, isAccessMap, mapController.getUserLandsOpen);


module.exports = router;