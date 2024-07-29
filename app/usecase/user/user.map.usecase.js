const db = require('../../models');

const { mapEagerLoading } = require('../../models/eagerLoading');
const getUserMapsOpen = async (userId) => {
    let maps = await db.PlayerMapOpen.findAll({
        where: {
          playerId: userId,
        },
        include: [
          { model: db.Player, },

          mapEagerLoading.map_object_active_location_assets,
        ]
    });

    return maps;
}

const UserMapUseCase = {
    getUserMapsOpen
};

module.exports = UserMapUseCase;