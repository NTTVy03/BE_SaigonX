const NAME = "RewardType";

const createModel = (sequelize, Sequelize) => {
  const RewardType = sequelize.define('reward_type', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
  });
  
  return RewardType;
};

module.exports = {
  createModel,
  NAME
}