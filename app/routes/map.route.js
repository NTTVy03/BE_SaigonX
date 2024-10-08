const express = require('express');
const router = express.Router();

const { authenticateJWT, isAdmin } = require('../middleware/auth.middleware');
const { isActiveMap, isOpenMap } = require('../middleware/map.middleware');

const mapController = require('../controllers/map.controller');

router.get("/"           ,                  mapController.getAllActiveMaps);
router.get('/all'        , authenticateJWT,   isAdmin,  mapController.getAllMaps);

// router.get("/user/:mapId/land/pass", authenticateJWT, isAccessMap, mapController.getUserLandsOpen);

router.get("/:mapId"        ,   isActiveMap, mapController.getActiveMapById);

module.exports = router;