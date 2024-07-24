const db = require('../models');
const Map = db.Map;
const Object = db.Object;
const Role = db.Role;
const PlayerMapOpen = db.PlayerMapOpen;

const { Roles } = require('../type/enum/Role');

/**
 * Check if user has permission to access the map or not
 *    - Map is Active => OK
 *    - Map is not Active => Check if user is Admin or not
 */
const isAccessMap = async (req, res, next) => {
  // console.log("isAccessMap: userId, mapId --> ", req.userId, req.params.mapId);
  let userId = req.userId;
  let mapId = req.params.mapId;

  let map = await Map.findByPk(mapId, 
    {
      include: [
        {
          model: db.Object,
          as: 'object',
        }
      ]
    }
  );

  // console.log("map --> ", map.dataValues);
  let isActive = map.object.isActive;

  if(isActive){
    next();
    return;
  }

  let roles = await Role.findAll({
    where: {
      userId: userId
    }
  });

  if (roles.include(Roles.ADMIN)) {
    next();
    return;
  }

  res.status(403).send({ message: "You don't have permission to access this map" });
}

const isOpenMap = async (req, res, next) => {
  let mapId = req.params.mapId;

  // check player_map_open
  let playerMapOpen = await PlayerMapOpen.findOne({
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