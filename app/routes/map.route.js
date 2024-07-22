const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../middleware/auth.middleware');
const { isAccessMap, isOpenMap } = require('../middleware/map.middleware');

const mapController = require('../controllers/map.controller');

router.get("/"           ,                  mapController.getAllMaps);


// router.get("/user/:mapId/land/pass", authenticateJWT, isAccessMap, mapController.getUserLandsOpen);

router.get("/:mapId"        ,                  mapController.getMapById);
router.get("/:mapId/land" ,                    mapController.getMapLands);

module.exports = router;