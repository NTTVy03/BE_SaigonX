const NAME = "PlayerMapOpen";

// this table is created by N-N association
// between Player and Map (isActive = true)
const createModel = (sequelize, Sequelize) => {
  const PlayerMapOpen = sequelize.define('player_map_open', {
    // FK: [N] player -- [N] map
    isPassed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    process: {
        // number of passed lands
        // TRIGGER to increase process when player pass a land
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    jsonData: {
        type: Sequelize.JSON
    },
    isActive: {
        // False if user is banned
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
  });
  
  return PlayerMapOpen;
};

module.exports = {
  createModel,
  NAME
}