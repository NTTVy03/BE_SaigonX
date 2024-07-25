const db = require('../../models');

const MapUsecase = require('../map.usecase');

const getUserMapsOpen = async (userId) => {
    let maps = await db.PlayerMapOpen.findAll({
        where: {
          playerId: userId,
        },
        include: [
          { model: db.Player, },

          MapUsecase.mapEagerLoading.map_object_active_location_assets,
        ]
    });

    return maps;
}

const UserMapUseCase = {
    getUserMapsOpen
};

module.exports = UserMapUseCase;