const NAME = "PlayerReward";

// this table is created by N-N association
// between Player and Map (isActive = true)
const createModel = (sequelize, Sequelize) => {
  const PlayerReward = sequelize.define('player_reward', {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
  });
  
  return PlayerReward;
};

module.exports = {
  createModel,
  NAME
}