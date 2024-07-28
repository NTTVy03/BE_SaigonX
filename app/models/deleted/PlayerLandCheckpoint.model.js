const NAME = 'PlayerLandCheckpoint';

const createModel = (sequelize, Sequelize) => {
  const PlayerLandCheckpoint = sequelize.define('player_land_checkpoint', {
    // [] FK: [N] Player_Land_Open -- [N] Checkpoint
    score: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    
    jsonData: {
      type: Sequelize.JSON
    },

    isActive: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
  });

  return PlayerLandCheckpoint;
}

module.exports = {
  NAME,
  createModel
};