const NAME = "Result";

const createModel = (sequelize, Sequelize) => {
  const Player = require('./Player.model').createModel(sequelize, Sequelize);
  const Object = require('./Object.model').createModel(sequelize, Sequelize);

  const Result = sequelize.define('result', {
    playerId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Player,
        key: 'id'
      }
    },
    objectId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: Object,
        key: 'id'
      }
    },
    score: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    jsonData: {
      type: Sequelize.JSON
    },
  });
  
  return Result;
};

module.exports = {
  createModel,
  NAME
}