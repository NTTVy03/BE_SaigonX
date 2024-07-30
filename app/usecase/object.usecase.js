const db = require('../models');
const { ObjectType } = require('../type/enum/ObjectType');

const getAllChildrenObject = async (objectParentId, options) => {
    const objects = await db.Object.findAll({
        where: { 
            parentId: objectParentId,
            isActive: true,
        },
        ...options,
    });

    return objects;
}

const getObjectDetail = async (objectId, options) => {
   const object = await  db.Object.findByPk(objectId, options);
   if(!object) throw new Error('Object Not Found');

   switch(object.type) {
        case ObjectType.MAP:
            object[object.type] = await object.getMap();
            break;
        case ObjectType.LAND:
            object[object.type] = await object.getLand();
            break;
        case ObjectType.CHECKPOINT: 
            object[object.type] = await object.getCheckpoint();
            break;
        case ObjectType.GAME: 
            object[object.type] = await object.getGame();
   }

   return object;
}

const isActiveObject = async (objectId) => {
    const object = await db.Object.findByPk(objectId);
    return object.isActive;
}

/**
 * Return PlayerObjectOpen of this object if true
 */
const getObjectOpen = async (playerId, objectId) => {
    return await db.PlayerObjectOpen.find({
        where: {
            playerId, 
            objectId
        }
    });
}

/**
 * Check if it's parent is open
 */
const isAccessObject = async (playerId, objectId) => {
    let playerObjecOpen = await getObjectOpen(playerId, objectId);
    if(!playerObjecOpen) return true;  // true

    const object = await getObjectDetail(objectId);
    return await isOpenObject(playerId, object.parentId);
}

const ObjectUsecase = {
    getAllChildrenObject,
    getObjectDetail,
    getObjectOpen,
    isAccessObject,
    isActiveObject
};

module.exports = ObjectUsecase;
