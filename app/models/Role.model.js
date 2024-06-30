const NAME = "Role";

const createModel = (sequelize, Sequelize) => {
  const Role = sequelize.define('role', {
    // [DONE] FK(userId): [1] user_account -- [N] role
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
  });
  
  return Role;
};

module.exports = {
  createModel,
  NAME
}