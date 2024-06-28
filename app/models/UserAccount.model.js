module.exports = (sequelize, Sequelize) => {
  const UserAccount = sequelize.define('user_account', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    fullName: {
      type: Sequelize.STRING,
      defaultValue: this.username,
      // defaultValue: sequelize.col('username'),
    }
  });
  
  return UserAccount;
};
