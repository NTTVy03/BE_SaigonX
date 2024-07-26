const NAME = "Game";

const createModel = (sequelize, Sequelize) => {
  const Object    = require('./Object.model.js' ).createModel(sequelize, Sequelize);

  const Game = sequelize.define('game', {
    checkpointId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: Object,
          key: 'id'
        }
    },
    code: {
        // ~ name
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
  });
  
  return Game;
};

module.exports = {
  createModel,
  NAME
}