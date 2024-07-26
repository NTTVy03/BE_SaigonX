const express = require('express')
const router = express.Router()
const UserResultController = require('../../controllers/user/user.result.controller')
const { isValidObjectType, isAccessObject } = require('../../middleware/object.middleware')

// router.post('/:objectType/objectId', isValidObjectType, isAccessObject, UserResultController.postUserResult);
router.post('/:objectType/objectId', UserResultController.postUserResult);

module.exports = router;