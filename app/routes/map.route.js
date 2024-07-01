const express = require('express');
const router = express.Router();

const { authenticateJWT } = require('../middleware/auth.middleware');

const mapController = require('../controllers/map.controller');

router.get("/"           ,                  mapController.getAllMaps);
router.get("/:id"        ,                  mapController.getMapById);
router.get("/user"       , authenticateJWT, mapController.getUserMapsOpen);
router.get("/user/:mapId", authenticateJWT, mapController.getUserMapDetail);
module.exports = router;