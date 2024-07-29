const NAME = "PlayerObjectOpen";

// this table is created by N-N association
// between Player and Object
const createModel = (sequelize, Sequelize) => {
  const Object = require("./Object.model").createModel(sequelize,Sequelize);

  const PlayerObjectOpen = sequelize.define('player_object_open', {
    id: {
      // id: NOT auto field because of the N-N associations 
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    playerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    objectId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    // parentId: parent of this PlayerObjectOpen (eg: player_map_open is parent of player_land_open)
    parentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        async checkParentId(value) {
            const object = await Object.findByPk(this.objectId);
            if (object.type !== 'map' && (value === null || value === undefined)) {
                throw new Error('parentId cannot be null if PlayerObjectOpen is not for a map');
            }
        }
      }
    },
    // objectId: association N-N player-object
    // playerId: association N-N player-object
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