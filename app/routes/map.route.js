const express = require('express');
const router = express.Router();

const { getMapObject, isActiveMap } = require('../middleware/map.middleware');

const mapController = require('../controllers/map.controller');

router.get("/"              ,                  mapController.getAllActiveMaps);
router.get("/:mapId"        , getMapObject, isActiveMap, mapController.getActiveMapById);

module.exports = router;