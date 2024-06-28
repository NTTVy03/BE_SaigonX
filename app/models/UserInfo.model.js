const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const UserInfo = sequelize.define(
    'user_info',
    {
      jsonData: {
        type: Sequelize.JSON
      }
    }
  )

  return UserInfo;
}