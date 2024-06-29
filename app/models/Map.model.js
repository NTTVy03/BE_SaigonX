const NAME = "Map";

const createModel = (sequelize, Sequelize) => {
  const Map = sequelize.define('map', {
    // FK: [1] map -- [1] object 
    // TRIGGER to create object with type 'map' --> hook: beforeCreate
    
    // FK: [1] location -- [1] map
    code: {
        // ~ name
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    num_land: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    jsonData: {
      type: Sequelize.JSON
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
  });
  
  return Map;
};

module.exports = {
  createModel,
  NAME
}