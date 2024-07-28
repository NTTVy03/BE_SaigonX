const NAME = "PlayerObjectOpen";

// this table is created by N-N association
// between Player and Object
const createModel = (sequelize, Sequelize) => {
  const PlayerObjectOpen = sequelize.define('player_object_open', {
    // id: auto field
    // parentId: parent of this PlayerObjectOpen (eg: player_map_open is parent of player_land_open)
    // objectId: association N-N player-object
    // player_id: association N-N player-object
    isPassed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    process: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    totalScore: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    jsonData: {
        type: Sequelize.JSON
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
  });
  
  return PlayerObjectOpen;
};

module.exports = {
  createModel,
  NAME
}