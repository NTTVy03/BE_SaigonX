const NAME = "PlayerMapData";

// addition table to contain data of a play map
// ex: data after passed a land
const createModel = (sequelize, Sequelize) => {
  const PlayerMapData = sequelize.define('player_map_data', {
    // FK: [1] player_map_open - [N] player_map_data
  });
  
  return PlayerMapData;
};

module.exports = {
  createModel,
  NAME
}