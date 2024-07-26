const db = require('../models');
const _ = require('lodash');
const { objectEagerLoading, landEagerLoading, mapEagerLoading } = require('../models/eagerLoading')

const getAllActiveMaps = async () => {
    console.log("# Get active maps");
    // Get active maps
    let maps = await db.Map.findAll({
        include: mapEagerLoading.map_object_active_location_assets.include
    });

    return maps;
}

const getAllMaps = async () => {
    console.log("# Get all maps");
    // Get all maps
    let maps = await db.Map.findAll({
        include: mapEagerLoading.map_object_all_location_assets.include
    });

    return maps;
}

// console.log("map_object_active_location_assets_and_land_detail.include: ", map_object_active_location_assets_and_land_detail.include);
const getActiveMapDetailById = async (mapId) => {
    // Get active maps
    let map = await db.Map.findByPk(mapId, {
        include: [
            _.cloneDeep(objectEagerLoading.object_active_location_assets),
            _.cloneDeep(landEagerLoading.land_object_active_location_assets),
        ]
    });

    return map;
}

const getMapDetailById = async (mapId) => {
    // Get active maps
    let map = await db.Map.findByPk(mapId, {
        include: mapEagerLoading.map_object_all_location_assets_land_detail.include
    });

    return map;
}

/** 
 * * map if map is active  
 * * null if map is not active
 */
const isActiveMap = async (mapId) => {
    let map = await db.Map.findByPk(mapId, 
        {
            include: mapEagerLoading.map_object_active.include
        }
    );

    return map;
}

/** 
 * * playerMapOpen if player open map  
 * * null if player not open map
 */
const isOpenMap = async(userId, mapId) => {
    let playerMapOpen = await db.PlayerMapOpen.findOne({
        where: {
            playerId: userId,
            mapId: mapId
        }
    });

    return playerMapOpen;
}

const isAccessMap = async (userId, mapId) => {
    let isActive = await isActiveMap(mapId);
    return isActive;
}

const MapUsecase = {
    isActiveMap,
    getAllActiveMaps,
    getAllMaps,
    getActiveMapDetailById,
    getMapDetailById,
    isAccessMap,
    isOpenMap,
};

module.exports = MapUsecase;