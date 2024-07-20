const NAME = "ObjectReward";

const createModel = (sequelize, Sequelize) => {
  const ObjectReward = sequelize.define('object_reward', {
    quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
  });
  
  return ObjectReward;
};

module.exports = {
  createModel,
  NAME
}