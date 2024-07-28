const NAME = "Game";

const createModel = (sequelize, Sequelize) => {
  const Object    = require('./Object.model.js' ).createModel(sequelize, Sequelize);

  const Game = sequelize.define('game', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: Object,
          key: 'id'
        }
    },
  });
  
  return Game;
};

module.exports = {
  createModel,
  NAME
}