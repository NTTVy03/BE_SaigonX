const NAME = "Asset";

const createModel = (sequelize, Sequelize) => {
  const Asset = sequelize.define('asset', {
    // [1] object -- [N] asset
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