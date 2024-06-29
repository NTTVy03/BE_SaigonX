module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'role',
    {
      // FK: [1] user_account -- [N] role
      role: {
        // backend manage role like enum
        // ex: "admin", "user",...
        type: Sequelize.STRING,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      }
    }
  )

  return Role;
}