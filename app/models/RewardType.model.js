const NAME = "RewardType";

const createModel = (sequelize, Sequelize) => {
  const RewardType = sequelize.define('reward_type', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,

        validate: {
          notNull: { msg: 'Code cannot be null'},
          notEmpty: { msg: 'Code cannot be empty' },
        }
    },
  });
  
  return RewardType;
};

module.exports = {
  createModel,
  NAME
}