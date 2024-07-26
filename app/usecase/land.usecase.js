const db = require('../models');
const _ = require('lodash');
const { isAccessMap, isOpenMap } = require('./map.usecase');
const { landEagerLoading, checkpointEagerLoading } = require('../models/eagerLoading');

const isLandActive = async (landId) => {
    let land = await db.Land.findByPk(landId, {
        include: landEagerLoading.land_object_active.include
    });

    return land;
}

const isOpenLand = async (userId, landId) => {
    let land = await isLandActive(landId);
    if(!land) { return null; }

    let isMapOpen = await isOpenMap(userId, land.mapId);
    if(!isMapOpen) { return null; }

    let playerMapOpenId = isMapOpen.id;
    let playerLandOpen = await db.PlayerLandOpen.findOne({
        where: { landId, playerMapOpenId }
    });

    return playerLandOpen;
}

const isAccessLand = async (userId, landId) => {
    let land = await isOpenLand(userId, landId);
    if(!land) { return null; }
    let mapId = land.mapId;

    return isOpenMap(userId, mapId);
}

const getDetailActiveLandById = async (landId) => {
    let landActiveDetail = await db.Land.findByPk(landId, {
        include: [
            landEagerLoading.land_object_active_location_assets.include,
            checkpointEagerLoading.checkpoint_object_active_location_assets
        ]
    });

    return landActiveDetail;
}
const LandUsecase = {
    getDetailActiveLandById,
    isAccessLand,
    isLandActive,
    isOpenLand,
};

module.exports = LandUsecase;