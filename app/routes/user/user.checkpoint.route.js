const express = require('express');
const { UserCheckpointController } = require('../../controllers/user');
const router = express.Router({ mergeParams: true });
const { isOpenCheckpoint } = require('../../middleware/checkpoint.middleware');

router.get('/', UserCheckpointController.getAllUserCheckpointsOpen);
router.get('/:checkpointId', isOpenCheckpoint, UserCheckpointController.getUserCheckpointOpen);

module.exports = router;