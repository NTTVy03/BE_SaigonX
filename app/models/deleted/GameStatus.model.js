const NAME = "GameStatus";

const createModel = (sequelize, Sequelize) => {
    const GameStatus = sequelize.define('game_status', {
        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        },
        type: {
            type: Sequelize.ENUM(['highest', 'current']),
            allowNull: false,
        },
        score: {
            type: Sequelize.FLOAT,
            defaultValue: 0,
            allowNull: false
          },
    });
  
  return GameStatus;
};

module.exports = {
  createModel,
  NAME
}