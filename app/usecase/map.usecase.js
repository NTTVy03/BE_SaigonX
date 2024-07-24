const db = require('../models');
const ObjectUsecase = require('./object.usecase');
const LandUsecase = require('./land.usecase');
const _ = require('lodash');


const object_active = {
    model: db.Object,
    where: {
        isActive: true,
    },
    required: true,
};

const object_all = {
    model: db.Object,
};

const object_active_location_assets = {
    ...object_active,
    include: _.cloneDeep(ObjectUsecase.objectEagerLoading.object_location_assets),
};

const object_all_location_assets = {
    ...object_all,
    include: _.cloneDeep(ObjectUsecase.objectEagerLoading.object_location_assets),
};

const object_active_location_assets_land_detail = [
    object_active_location_assets,
    {
        model: db.Land,
        include: LandUsecase.landEagerLoading.object_active_location_assets,
    },
]

const object_all_location_assets_land_detail = [
    object_all_location_assets,
    {
        model: db.Land,
        include: LandUsecase.landEagerLoading.object_all_location_assets,
    },
]

const mapEagerLoading = {
    object_active,
    object_all,
    object_active_location_assets,
    object_all_location_assets,
    object_active_location_assets_land_detail,
    object_all_location_assets_land_detail
};


const getActiveMaps = async () => {
    console.log("# Get active maps");
    // Get active maps
    let maps = await db.Map.findAll({
        include: mapEagerLoading.object_active_location_assets,
    });

    return maps;
}

const getAllMaps = async () => {
    console.log("# Get all maps");
    // Get all maps
    let maps = await db.Map.findAll({
        include: mapEagerLoading.object_all_location_assets,
    });

    return maps;
}

const getActiveMapDetailById = async (mapId) => {
    // Get active maps
    let map = await db.Map.findOne({
        where: {
            id: mapId,
        },
        include: mapEagerLoading.object_active_location_assets_land_detail,
    });

    return map;
}

const getMapDetailById = async (mapId) => {
    // Get active maps
    let map = await db.Map.findOne({
        where: {
            id: mapId,
        },
        include: [
            mapEagerLoading.object_all_location_assets, 
            {
                model: db.Land,
                include: LandUsecase.landEagerLoading.object_all_location_assets,
            }, 
        ],
    });

    return map;
}

const MapUsecase = {
    getActiveMaps,
    getAllMaps,
    getActiveMapDetailById,
    getMapDetailById,
    mapEagerLoading,
};

module.exports = MapUsecase;