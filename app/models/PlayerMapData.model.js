const NAME = "PlayerMapData";

const createModel = (sequelize, Sequelize) => {
  const PlayerMapData = sequelize.define('player_map_data', {
    // player_map_open_id ???
  });
  
  return PlayerMapData;
};

module.exports = {
  createModel,
  NAME
}