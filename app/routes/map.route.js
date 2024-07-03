const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../middleware/auth.middleware');
const { isAccessMap } = require('../middleware/map.middleware');

const mapController = require('../controllers/map.controller');

router.get("/"           ,                  mapController.getAllMaps);

router.get("/user"       , authenticateJWT, mapController.getUserMapsOpen);
router.get("/user/:mapId", authenticateJWT, isAccessMap, mapController.getUserMapDetail);
router.post('/user/:mapId', authenticateJWT, mapController.postPlayerOpenMap);
router.get("/user/:mapId/land", authenticateJWT, isAccessMap, mapController.getUserLandsOpen);
// router.get("/user/:mapId/land/pass", authenticateJWT, isAccessMap, mapController.getUserLandsOpen);

router.get("/:mapId"        ,                  mapController.getMapById);
router.get("/:mapId/land" ,                    mapController.getMapLands);

module.exports = router;