const express = require('express');
const router = express.Router();

const { isOpenMap, isAccessMap } = require('../../middleware/map.middleware');
const {  UserMapController } = require('../../controllers/user');

router.get("/"   ,  UserMapController.getUserMapsOpen);
router.get("/:mapId", isAccessMap, isOpenMap, UserMapController.getUserMapDetail);
// router.post('/:mapId', authenticateJWT, UserMapController.postPlayerOpenMap);


// router.get("/:mapId/land", authenticateJWT, isAccessMap, mapController.getUserLandsOpen);


module.exports = router;