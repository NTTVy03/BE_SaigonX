const db = require('../../models');
const MapUsecase = require('../map.usecase');
const PlayerObjectOpenUsecase = require('../playerObjectOpen.usecase');

const getUserMapsOpen = async (userId) => {
    // get at playerObjectOpen
    let maps = await MapUsecase.getAllActiveMaps();
    for (let map of maps) {
        let playerObjectOpen = await PlayerObjectOpenUsecase.getPlayerObjectOpen(userId, map.id);
        map.dataValues.playerObjectOpen = playerObjectOpen;
    }
    return maps;
}

const getUserMapDetail = async (userId, mapId) => {
    return await db.PlayerMapOpen.findOne({
        where: {
            userId,
            objectId: mapId,
        },
    });
}

const isOpenMap = async (userId, mapId) => {
    return await db.PlayerMapOpen.findOne({
        where: {
            userId,
            mapId,
        }
    });
}

const UserMapUseCase = {
    getUserMapsOpen, 
    isOpenMap
};

module.exports = UserMapUseCase;