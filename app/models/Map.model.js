const NAME = "Map";

const createModel = (sequelize, Sequelize) => {
  const Map = sequelize.define('map', {
    // FK: [1] map -- [1] object 
    // TRIGGER to create object with type 'map' --> hook: beforeCreate

    num_land: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
  });
  
  return Map;
};

module.exports = {
  createModel,
  NAME
}