const express = require('express');
const router = express.Router({ mergeParams: true });

const UserCheckpointRoute = require('./user.checkpoint.route');
const { UserLandController } = require('../../controllers/user') 
const { isOpenLand } = require('../../middleware/land.middleware');

router.get('/', UserLandController.getAllUserLandsOpen);
router.get("/:landId"  , isOpenLand, UserLandController.getUserLandOpen);
router.use("/:landId/checkpoint"  , isOpenLand, UserCheckpointRoute);


module.exports = router;