const db = require('../models');
const { ObjectType } = require('../type/enum/ObjectType');
const { UserMapUsecase, MapUsecase, ObjectUsecase } = require('../usecase');

const getMapObject = async (req, res, next) => {
    const mapId = req.params.mapId;

    const map = await ObjectUsecase.getObjectDetail(mapId);

    if(!map || map.type != ObjectType.MAP) {
      res.status(404).send({ message: 'Map not found' });
      return;
    }

    req.map = map;
    next();
}

/**
 * Check if map isActive
 */
const isActiveMap = (req, res, next) => {
    const map = req.map;
    if(map.isActive) {
      next();
      return;
    }

    res.status(403).send({ message: 'Map is not active' });
}

/**
 * Check if User Open Map => Have record in PlayerMapOpen
 */
const isOpenMap = async (req, res, next) => {
  let mapId = req.params.mapId;
  let userId = req.userId;

  try{
    const playerMapOpen = await MapUsecase.getPlayerMapOpen(userId, mapId);
  
    if(playerMapOpen){
      req.playerMapOpen = playerMapOpen;
      next();
      return;
    }

    res.status(403).send({ message: "User haven't unlock this map" });
  }catch(err){
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  isActiveMap,
  isOpenMap,
  getMapObject,
};