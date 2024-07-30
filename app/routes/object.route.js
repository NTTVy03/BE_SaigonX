const express = require('express');
const { ObjectController } = require('../controllers');
const router = express.Router();

router.get('/map', ObjectController.getAllMap);
router.get('/:objectId', ObjectController.getObjectById);
router.get('/:objectId/children', ObjectController.getObjectChildren);

module.exports = router;