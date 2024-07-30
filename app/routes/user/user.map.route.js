const express = require('express');
const router = express.Router();

const UserLandRoute = require('./user.land.route')

const { isOpenMap, getMapObject, isActiveMap } = require('../../middleware/map.middleware');
const {  UserMapController } = require('../../controllers/user');

router.get("/"   ,   UserMapController.getAllUserMapsOpen);
router.get("/:mapId", getMapObject, isActiveMap, isOpenMap, UserMapController.getUserMapDetail);
router.use("/:mapId/land", getMapObject, isActiveMap, isOpenMap, UserLandRoute);


module.exports = router;