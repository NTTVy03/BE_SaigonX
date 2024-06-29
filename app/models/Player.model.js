module.exports = (sequelize, Sequelize) => {
  const Player = sequelize.define(
    'player',
    {
      // FK: [1] user_account - [1] player = PK
      
      jsonData: {
        type: Sequelize.JSON
      }
    }
  )

  return Player;
}