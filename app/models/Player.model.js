exports.createModel = (sequelize, Sequelize) => {
  const UserAccount = require("./UserAccount.model").createModel(sequelize, Sequelize);
  
  const Player = sequelize.define(
    'player',
    {
      id: {
        // [DONE] PK = FK(id): [1] user_account -- [1] player
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: UserAccount,
          key: 'id'
        }
      },
      jsonData: {
        type: Sequelize.JSON
      }
    }
  )

  return Player;
}

exports.NAME = "Player";
