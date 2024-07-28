const NAME = "Map";

const createModel = (sequelize, Sequelize) => {
  const Object = require("./Object.model").createModel(sequelize,Sequelize);

  const Map = sequelize.define('map', 
    {
      id: {
        // [DONE] PK = FK: [1] map -- [1] object 
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: Object,
          key: 'id'
        }
      }, 
    },
  );
  
  return Map;
};

module.exports = {
  createModel,
  NAME
}