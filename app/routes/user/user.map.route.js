const express = require('express');
const router = express.Router();

const UserLandRoute = require('./user.land.route')

const { isOpenMap } = require('../../middleware/map.middleware');
const {  UserMapController } = require('../../controllers/user');

router.get("/"   ,  UserMapController.getUserMapsOpen);
router.get("/:mapId", isOpenMap, UserMapController.getUserMapDetail);
// router.post('/:mapId', authenticateJWT, UserMapController.postPlayerOpenMap);


router.use("/:mapId/land", isOpenMap, UserLandRoute);


module.exports = router;