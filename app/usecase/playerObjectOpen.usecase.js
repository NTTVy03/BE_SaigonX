const db = require('../models');

const getPlayerObjectOpen = async (userId, objectId) => {
    return await db.PlayerObjectOpen.findOne({
        where: {
            playerId: userId,
            objectId,
        },
    });
}

const PlayerObjectOpenUsecase = {
    getPlayerObjectOpen,
};

module.exports = PlayerObjectOpenUsecase;