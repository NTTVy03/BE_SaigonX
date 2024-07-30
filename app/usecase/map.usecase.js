const db = require('../models');
const _ = require('lodash');
const { getAllChildrenObject } = require('./object.usecase');
const ObjectUsecase = require('./object.usecase');
const { ObjectType } = require('../type/enum/ObjectType');

const getAllActiveMaps = async () => {
    const maps = await getAllChildrenObject(null, {
        include: [
            { model: db.Location, },
            { model: db.Asset     },
            { model: db.Map       },
        ]
    });

    return maps;
}

const getActiveMapDetailById = async (mapId) => {
    const map = await ObjectUsecase.getObjectDetail(mapId);
    if(map.type != ObjectType.MAP) throw new Error('This map not valid');

    map.dataValues.lands = await ObjectUsecase.getAllChildrenObject(map.id, {
        include: [
            { model: db.Location,},
            { model: db.Asset,   },
            { model: db.Land,   },
        ]
    })

    return map;
}

// --- user ---
const getPlayerMapOpen = async (userId, mapId) => {
    return await db.PlayerObjectOpen.findOne({
        where: { playerId: userId, objectId: mapId,},
        include: [
            { model: db.Object,
                include: [ 
                    { model: db.Location, },
                    { model: db.Asset,     },
                    { model: db.Map,       },
                 ]
            },
        ] 
    });
}
const getAllUserMapsOpen = async (userId) => {
    const maps = await db.PlayerObjectOpen.findAll({
        where: { playerId: userId, },
        include: [
            { 
                model: db.Object,
                where: { type: ObjectType.MAP },
                required: true, 
                include: [
                    { model: db.Location, },
                    { model: db.Asset,     },
                    { model: db.Map,       },
                ]
            }
        ]
    });

    return maps;
}

const MapUsecase = {
    getAllActiveMaps,
    getActiveMapDetailById,
    getPlayerMapOpen,
    getAllUserMapsOpen,
};

module.exports = MapUsecase;