const db = require('../../models');

const MapUsecase = require('../map.usecase');

const getUserMapsOpen = async (userId) => {
    let maps = await db.PlayerMapOpen.findAll({
        where: {
          playerId: userId,
        },
        include: [
          { model: db.Player, },

          {
            model: db.Map,
            required: true,
            
            include: MapUsecase.mapEagerLoading.object_active_location_assets,
          },
          // {
          //   model: db.PlayerMapData,
          //   as: 'playerMapData'
          // }
        ]
    });

    return maps;
}

const UserMapUseCase = {
    getUserMapsOpen
};

module.exports = UserMapUseCase;