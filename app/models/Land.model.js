const NAME = "Land";

const createModel = (sequelize, Sequelize) => {
  const Land = sequelize.define('land', {
    // FK: [1] land -- [1] object 
    // TRIGGER to create object with type 'land' --> hook: beforeCreate
    
    // FK: [1] map -- [N] land

    // TRIGGER to increase num_land in map when create a land 
    // hook: <land>.afterCreate

    // [1] land - [1] location NOT NULL

    code: {
        // ~ name
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    jsonData: {
        type: Sequelize.JSON
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
  });
  
  return Land;
};

module.exports = {
  createModel,
  NAME
}