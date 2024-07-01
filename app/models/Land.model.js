const NAME = "Land";

const createModel = (sequelize, Sequelize) => {
  // const Map    = require('./Map.model.js' ).createModel(sequelize, Sequelize);
  
  const Land = sequelize.define(
    'land', 
    {
      id: {
        // [DONE] PK = FK: [1] land -- [1] object 
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: Object,
          key: 'id'
        }
      }
      
      // [DONE] FK: [1] map -- [N] land NOT NULL
    }
  );
  
  return Land;
};

module.exports = {
  createModel,
  NAME
}