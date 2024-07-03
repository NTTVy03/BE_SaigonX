const NAME = 'ObjectAssets';

const createModel = (sequelize, Sequelize) => {
  const ObjectAssets = sequelize.define('object_assets', {
    
  });
  return ObjectAssets;
};

module.exports = {
  createModel,
  NAME
};