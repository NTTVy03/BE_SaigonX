const NAME = "GameLeaderboard";

const createModel = (sequelize, Sequelize) => {
  const GameLeaderboard = sequelize.define('game_leaderboard', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    jsonData: {
        type: Sequelize.JSON
    },
  });
  
  return GameLeaderboard;
};

module.exports = {
  createModel,
  NAME
}