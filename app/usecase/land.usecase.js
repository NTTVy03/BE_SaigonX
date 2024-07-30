const db = require('../models');
const _ = require('lodash');
const { ObjectType } = require('../type/enum/ObjectType');

const getAllUserLandsOpen = async(playerId, mapId) => {
   let lands = await db.PlayerObjectOpen.findAll({
    where: { playerId },
    include: {
        model: db.Object, 
        where: { type: ObjectType.LAND },
        parentId: mapId,
        required: true,
        include: [
            {model: db.Land,}   ,
            {model: db.Location},
            {model: db.Asset},
        ]
    }
   });

   return lands;
}

const getUserLandOpen =  async(playerId, landId) => {
    let land = await db.PlayerObjectOpen.findOne({
        where: { playerId, objectId: landId },
        include: {
            model: db.Object,
            where: { type: ObjectType.LAND },
            required: true,
            include: [
                {model: db.Land},
                {model: db.Location},
                {model: db.Asset},
            ]
        }
    });

    return land;
}

const LandUsecase = {
    getUserLandOpen,
    getAllUserLandsOpen
};

module.exports = LandUsecase;