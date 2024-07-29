const db = require('../models');
const { ObjectType, ObjectTypeManager } = require('../type/enum/ObjectType');
const { objectEagerLoading } = require('../models/eagerLoading');

const getPlayerMapOpen = async (playerId) => {
    return await db.PlayerObjectOpen.findAll({
        where: {
            playerId,
        },
        include: objectEagerLoading.object_map_active_location_assets
    });
}

const PlayerObjectOpenUsecase = {
    getPlayerMapOpen,
};

module.exports = PlayerObjectOpenUsecase;