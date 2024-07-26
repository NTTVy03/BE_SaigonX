const { ObjectTypeManager, ObjectType } = require('../type/enum/ObjectType');

const isValidObjectType = (req, res, next) => {
    let type = req.params.objectType;
    let objectType = ObjectTypeManager.getObjectType(type.toLowerCase());
    if(objectType === null){
        return res.status(400).json({message: 'Invalid object type'});
    }

    req.objectType = objectType;
    next();
}

const isObjectTypeCanUpdateResult = (req, res, next) => {
    let objectType = req.objectType;

    if(objectType === ObjectType.GAME){
        return res.status(400).json({message: 'Cannot update result for game'});
    }

    next();
}

/** 
 * Check if user has access to the object
 *    - First, check valid of object. 
 *    - Get Object Detail.
 *    - If checkpoint => check if user open land.
 *    - If land       => check if user open map.
 */
const isAccessObject = (req, res, next) => {
    let objectType = req.objectType;
    let objectId = req.params.objectId;
    let userId = req.userId;

    // Check if user has access to the object
    next();
}

module.exports = {
    isValidObjectType,
    isObjectTypeCanUpdateResult,
    isAccessObject
}