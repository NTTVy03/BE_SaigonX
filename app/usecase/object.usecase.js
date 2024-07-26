const db = require('../models');
const { ObjectType } = require('../type/enum/ObjectType');
const CheckpointUsecase = require('./checkpoint.usecase');
const LandUsecase = require('./land.usecase');
const MapUsecase = require('./map.usecase');
const getObjectDetail = async (objectId, objectType) => {
    const eagerLoading = [object_active_location_assets.include];

    switch (objectType) {
        case ObjectType.MAP:
            eagerLoading.push({model: db.Map});
            break;
        case ObjectType.LAND:
            eagerLoading.push({model: db.Land});
            break;
        case ObjectType.CHECKPOINT:
            eagerLoading.push({model: db.Checkpoint});
            break;
        case ObjectType.GAME:
            eagerLoading.push({model: db.Game});
            break;
        default: 
            return null;
    }

    const object = await db.Object.findOne({
        where: { id: objectId, },
        include: eagerLoading,
    });

    return object;
}

const getObjectAccess = async (objectId, objectType, userId) => {
    console.log('ObjectType: ', objectType);
    switch (objectType) {
        case ObjectType.CHECKPOINT:
            let isAccessCheckpoint = await CheckpointUsecase.isAccessCheckpoint(userId, objectId);
            return isAccessCheckpoint;
        case ObjectType.LAND:
            let isAccessLand = await LandUsecase.isOpenLand(userId, objectId);
            return isAccessLand;
        case ObjectType.MAP:
            let isAccessMap = await MapUsecase.isOpenMap(userId, objectId);
            return isAccessMap;
        default:
            return null;
    }
}

const ObjectUsecase = {
    getObjectDetail,
    getObjectAccess
};

module.exports = ObjectUsecase;
