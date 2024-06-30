const NAME = "Asset";

const createModel = (sequelize, Sequelize) => {
  const Asset = sequelize.define('asset', {
    // FK(objectId): [N] object -- [N] asset
    // which is the through table???
    src: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    type: {
        type: Sequelize.ENUM(['image', 'video']),
        allowNull: false,
    },
    jsonData: {
      type: Sequelize.JSON
  }
  });
  
  return Asset;
};

module.exports = {
  createModel,
  NAME
}