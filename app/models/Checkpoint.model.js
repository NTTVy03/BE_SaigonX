const NAME = "Checkpoint";

const createModel = (sequelize, Sequelize) => {
  const Checkpoint = sequelize.define('checkpoint', {
    // FK: [1] land -- [1] object 
    // TRIGGER to create object with type 'checkpoint' --> hook: beforeCreate
    
    // FK: [1] land -- [N] checkpoint NOT NULL

    // FK: [1] checkpoint - [1] location NOT NULL

    code: {
        // ~ name
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    ordinal: {
        // index of checkpoint in land (1,2,3...)
        // how to check unique for a checkpoint in a land
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    jsonData: {
        type: Sequelize.JSON
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
  });
  
  return Checkpoint;
};

module.exports = {
  createModel,
  NAME
}