const express = require('express')
const router = express.Router()
const UserResultController = require('../../controllers/user/user.result.controller')
const { isValidObjectType, isObjectTypeCanUpdateResult, isAccessObject } = require('../../middleware/object.middleware')

router.get('/', (req, res) => { res.send('User Result Route') }) 
router.get('/:objectType', isValidObjectType, isObjectTypeCanUpdateResult, (req, res) => {
    let objectType = req.params.objectType;
    res.send(`User Result Route - ${objectType}`)
})
router.put('/:objectType/:objectId', 
    isValidObjectType, 
    // isObjectTypeCanUpdateResult, 
    isAccessObject, 
    UserResultController.putUserResult
);

module.exports = router;