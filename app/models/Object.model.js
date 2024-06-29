const NAME = "Object";

const createModel = (sequelize, Sequelize) => {
  const Object = sequelize.define('object', {
    type: {
      type: Sequelize.ENUM(['map', 'land', 'checkpoint']),
      allowNull: false,
    },
  });
  
  return Object;
};

module.exports = {
  createModel,
  NAME
}