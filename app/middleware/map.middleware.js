const db = require('../models');

const { Roles } = require('../type/enum/Role');
const MapUsecase = require('../usecase/map.usecase');

/**
 * Check if map isActive
 */
const isAccessMap = async (req, res, next) => {
  // console.log("isAccessMap: userId, mapId --> ", req.userId, req.params.mapId);
  let userId = req.userId;
  let mapId = req.params.mapId;

  let map = await Map.findByPk(mapId, 
    {
      include: MapUsecase.mapEagerLoading.object_active
    }
  );
  if(!map) {
    res.status(403).send({ message: "You don't have permission to access this map" });
    return;
  }

  req.map = map;
  next();
}

/**
 * Check if User Open Map => Have record in PlayerMapOpen
 */
const isOpenMap = async (req, res, next) => {
  let mapId = req.params.mapId;

  // check player_map_open
  let playerMapOpen = await db.PlayerMapOpen.findOne({
    where: {
      playerId: req.userId,
      mapId: mapId
    }
  });

  if(playerMapOpen){
    console.log("playerMapOpen --> ", playerMapOpen.dataValues);
    req.playerMapOpen = playerMapOpen;
    next();
    return;
  }

  res.status(403).send({ message: "User haven't unlock this map" });
}

module.exports = {
  isAccessMap,
  isOpenMap
};