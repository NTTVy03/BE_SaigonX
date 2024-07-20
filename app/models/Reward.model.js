const NAME = "Reward";

const createModel = (sequelize, Sequelize) => {
  const Reward = sequelize.define('reward', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    scoreValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
  });
  
  return Reward;
};

module.exports = {
  createModel,
  NAME
}