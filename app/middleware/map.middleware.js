const db = require('../models');

const { Roles } = require('../type/enum/Role');
const MapUsecase = require('../usecase/map.usecase');

/**
 * Check if map isActive
 */
const isActiveMap = async (req, res, next) => {
  // console.log("isAccessMap: userId, mapId --> ", req.userId, req.params.mapId);
  let userId = req.userId;
  let mapId = req.params.mapId;

  try{
    let map = await MapUsecase.isActiveMap(mapId);
    if(map){
      req.map = map;
      next();
      return;
    }

    res.status(403).send({ message: "You don't have permission to access this map" });
  } catch(err){
    res.status(500).send({ message: err.message });
  }
}

/**
 * Check if User Open Map => Have record in PlayerMapOpen
 */
const isOpenMap = async (req, res, next) => {
  let mapId = req.params.mapId;
  let userId = req.userId;


  // check player_map_open

  try{
    let playerMapOpen = await MapUsecase.isOpenMap(userId, mapId);
  
    if(playerMapOpen){
      console.log("playerMapOpen --> ", playerMapOpen.dataValues);
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
  isOpenMap
};