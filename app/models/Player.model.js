module.exports = (sequelize, Sequelize) => {
  const Player = sequelize.define(
    'player',
    {
      jsonData: {
        type: Sequelize.JSON
      }
    }
  )

  return Player;
}