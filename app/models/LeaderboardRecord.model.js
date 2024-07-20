const NAME = "LeaderboardRecord";

const createModel = (sequelize, Sequelize) => {
  const LeaderboardRecord = sequelize.define('leaderboard_record', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    ordinal: {
        // index of checkpoint in land (1,2,3...)
        // how to check unique for a checkpoint in a land
        type: Sequelize.INTEGER,
        allowNull: false,
    },
  });
  
  return LeaderboardRecord;
};

module.exports = {
  createModel,
  NAME
}