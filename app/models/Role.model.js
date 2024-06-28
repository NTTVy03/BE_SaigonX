module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    'role',
    {
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN
      }
    }
  )

  return Role;
}