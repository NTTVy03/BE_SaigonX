const NAME = "Land";

const createModel = (sequelize, Sequelize) => {
  const Land = sequelize.define('land', {
    // FK: [1] land -- [1] object 
    // TRIGGER to create object with type 'land' --> hook: beforeCreate
    
    // FK: [1] map -- [N] land NOT NULL

    // TRIGGER to increase num_land in map when create a land 
    // hook: <land>.afterCreate

  });
  
  return Land;
};

module.exports = {
  createModel,
  NAME
}