const db = require('../models');
const ObjectUsecase = require('./object.usecase');
const LandUsecase = require('./land.usecase');
const _ = require('lodash');

const map_only = {
    model: db.Map,
}

const map_object_active = {
    model: db.Map,
    include: ObjectUsecase.objectEagerLoading.object_active,
}

const map_object_all = {
    model: db.Map,
    include: ObjectUsecase.objectEagerLoading.object_all,    
}

const map_object_active_location_assets = {
    model: db.Map,
    include: ObjectUsecase.objectEagerLoading.object_active_location_assets,
}

const map_object_all_location_assets = {
    model: db.Map,
    include: ObjectUsecase.objectEagerLoading.object_all_location_assets,
}

const map_object_active_location_assets_and_land_detail = {
    model: db.Map,
    include: [
        ObjectUsecase.objectEagerLoading.object_active_location_assets.include,
        LandUsecase.landEagerLoading.land_object_active_location_assets,
    ]
}

const map_object_all_location_assets_land_detail = {
    model: db.Map,
    include: [
        ObjectUsecase.objectEagerLoading.object_all_location_assets,
        LandUsecase.landEagerLoading.land_object_all_location_assets,
    ]
}

const mapEagerLoading = {
    map_only,
    map_object_active,
    map_object_all,
    map_object_active_location_assets,
    map_object_all_location_assets,
    map_object_active_location_assets_and_land_detail,
    map_object_all_location_assets_land_detail,
};


const getAllActiveMaps = async () => {
    console.log("# Get active maps");
    // Get active maps
    let maps = await db.Map.findAll({
        include: map_object_active_location_assets.include
    });

    return maps;
}

const getAllMaps = async () => {
    console.log("# Get all maps");
    // Get all maps
    let maps = await db.Map.findAll({
        include: map_object_all_location_assets.include
    });

    return maps;
}

// console.log("map_object_active_location_assets_and_land_detail.include: ", map_object_active_location_assets_and_land_detail.include);
const getActiveMapDetailById = async (mapId) => {
    // Get active maps
    let map = await db.Map.findByPk(mapId, {
        include: [
            _.cloneDeep(ObjectUsecase.objectEagerLoading.object_active_location_assets),
            _.cloneDeep(LandUsecase.landEagerLoading.land_object_active_location_assets),
        ]
    });

    return map;
}

const getMapDetailById = async (mapId) => {
    // Get active maps
    let map = await db.Map.findByPk(mapId, {
        include: map_object_all_location_assets_land_detail.include
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
            include: map_object_active.include
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
    return await isOpenMap(userId, mapId);
}

const MapUsecase = {
    isActiveMap,
    getAllActiveMaps,
    getAllMaps,
    getActiveMapDetailById,
    getMapDetailById,
    isAccessMap,
    isOpenMap,
    mapEagerLoading,
};

module.exports = MapUsecase;