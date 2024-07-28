const NAME = 'PlayerLandOpen';

const createModel = (sequelize, Sequelize) => {
  const PlayerLandOpen = sequelize.define('player_land_open', {
    // [DONE] FK: [N] player -- [N] land
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    isPassed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    process: {
      // number of passed checkpoint
      // TRIGGER to increase process when player pass a land
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    score: {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    jsonData: {
      type: Sequelize.JSON
    },
    isActive: {
      // False if user is banned
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
  });

  return PlayerLandOpen;
}

module.exports = {
  NAME,
  createModel
};